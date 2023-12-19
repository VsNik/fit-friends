import { randomUUID } from 'crypto';
import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { OtherError, AppError } from '@fit-friends/libs/validation';
import { ExpressFile, RequestExpress } from '@fit-friends/libs/types';
import { IAuthToken, IRefreshTokenPayload, IUser } from '@fit-friends/shared';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokensService } from '../tokens/tokens.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signup(dto: SignupDto, avatar: Express.Multer.File): Promise<IUser> {
    return this.usersService.create(dto, avatar);
  }

  async createUserProfile(userId: string, createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUserProfile(userId, createUserDto);
    return {
      ...createdUser,
      token: await this.createAuthToken(createdUser, randomUUID()),
    }
  }

  async createCoachProfile(userId: string, createCoachDto: CreateCoachDto, certificate: ExpressFile) {
    const createdCoach = await this.usersService.createCoachProfile(userId, createCoachDto, certificate);
    return {
      ...createdCoach,
      token: await this.createAuthToken(createdCoach, randomUUID()),
    }
  }

  async verifyUser({ email, password }: LoginDto, req: RequestExpress): Promise<IAuthToken> {
    if (req.accessToken) {
      return { accessToken: req.accessToken };
    }

    const existUser = await this.usersService.findByEmail(email);
    if (!existUser) {
      throw new UnprocessableEntityException(OtherError.Credentials);
    }
    const isValidPswd = await compare(password, existUser.password);
    if (!isValidPswd) {
      throw new UnprocessableEntityException(OtherError.Credentials);
    }
    return this.createAuthToken(existUser.toObject(), randomUUID());
  }

  async verifyRefreshToken(refreshToken: string): Promise<IAuthToken> {
    const { userId, sessionId } = await this.getRefreshTokenPayload(refreshToken);
    await this.removeSession(sessionId);
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }
    return this.createAuthToken(user.toObject(), randomUUID());
  }

  async logout(refreshToken: string) {
    const { sessionId } = await this.getRefreshTokenPayload(refreshToken);
    await this.removeSession(sessionId);
  }

  async findUserById(id: string): Promise<IUser> {
    const existUser = await this.usersService.findById(id);
    if (!existUser) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }
    return existUser.toObject();
  }

  async createAuthToken(user: IUser, sessionId: string): Promise<IAuthToken> {
    const accessPayload = { id: user.id, role: user.role };
    const refreshPayload = { userId: user.id, sessionId };
    this.tokensService.createRefreshSession(user.id, sessionId);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async getRefreshTokenPayload(refreshToken: string): Promise<IRefreshTokenPayload> {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException(AppError.Unauthorized);
    }
  }

  private async removeSession(sessionId: string): Promise<boolean> {
    const existToken = await this.tokensService.isExist(sessionId);
    if (!existToken) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }
    return this.tokensService.deleteRefreshSession(sessionId);
  }
}
