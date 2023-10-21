import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from '../users/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens/tokens.service';
import { IAuthToken, IRefreshTokenPayload } from '@fit-friends/libs/types';
import { LoginDto } from './dto/login.dto';
import { randomUUID } from 'crypto';
import { compare } from 'bcrypt';

const CREDENTIALS_ERROR = 'Invalid Email address and / or Password';
const USER_NOT_FOUND_ERROR = 'User not found';
const UNAUTORIZED_ERROR = 'Unauthorized';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  signup(dto: CreateUserDto | CreateCoachDto, avatar: Express.Multer.File, bgImage: Express.Multer.File): Promise<IUser> {
    return this.usersService.create(dto, avatar, bgImage);
  }

  async verifyUser({ email, password }: LoginDto): Promise<IAuthToken> {
    const existUser = await this.usersService.findByEmail(email);
    if (!existUser) {
      throw new UnprocessableEntityException(CREDENTIALS_ERROR);
    }
    const isValidPswd = await compare(password, existUser.password);
    if (!isValidPswd) {
      throw new UnprocessableEntityException(CREDENTIALS_ERROR);
    }
    return this.createAuthToken(existUser.toObject(), randomUUID());
  }

  async verifyRefreshToken(refreshToken: string): Promise<IAuthToken> {
    const { userId, sessionId } = await this.getRefreshTokenPayload(refreshToken);
    await this.removeSession(sessionId);
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
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
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
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
      return this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException(UNAUTORIZED_ERROR);
    }
  }

  private async removeSession(sessionId: string): Promise<void> {
    const existToken = await this.tokensService.isExist(sessionId);
    if (!existToken) {
      throw new UnauthorizedException(UNAUTORIZED_ERROR);
    }
    await this.tokensService.deleteRefreshSession(sessionId);
  }
}
