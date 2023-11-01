import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile } from '@fit-friends/libs/types';
import { UserFilesValidationPipe } from '@fit-friends/libs/pipes';
import { CoachProfileRdo, LoggedRdo, UserProfileRdo, UserRdo } from '@fit-friends/libs/rdo';
import { fillObject } from '@fit-friends/libs/utils';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCoachDto } from './dto/create-coach.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserId } from './decorators/user-id.decorator';
import { RequestExpress } from './types/request-express';
import { AnonymousGuard } from './guards/anonymous.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AnonymousGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('signup-user')
  async signupUser(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar: ExpressFile): Promise<UserProfileRdo> {
    const createdUser = await this.authService.signup(createUserDto, avatar);
    return fillObject(UserProfileRdo, createdUser);
  }

  @UseGuards(AnonymousGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'certificate', maxCount: 1 },
    ]),
  )
  @Post('signup-coach')
  async signupCoach(
    @Body() createCoachDto: CreateCoachDto,
    @UploadedFiles(new UserFilesValidationPipe()) files: { avatar: ExpressFile; certificate: ExpressFile },
  ): Promise<CoachProfileRdo> {
    const createdCoach = await this.authService.signup(createCoachDto, files.avatar, files.certificate);
    return fillObject(CoachProfileRdo, createdCoach);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: RequestExpress): Promise<LoggedRdo> {
    const logged = req.accessToken ? { accessToken: req.accessToken } : await this.authService.verifyUser(loginDto);
    return fillObject(LoggedRdo, logged);
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshDto): Promise<LoggedRdo> {
    const logged = await this.authService.verifyRefreshToken(refreshToken);
    return fillObject(LoggedRdo, logged);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Body() { refreshToken }: RefreshDto) {
    this.authService.logout(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('check')
  async check(@UserId() id: string): Promise<UserRdo> {
    const authUser = await this.authService.findUserById(id);
    return fillObject(UserRdo, authUser);
  }
}
