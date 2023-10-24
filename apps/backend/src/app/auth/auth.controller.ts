import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ExpressFile } from '@fit-friends/libs/types';
import { UserFilesValidationPipe } from '@fit-friends/libs/pipes';
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'bgImage', maxCount: 1 },
    ]),
  )
  @Post('signup-user')
  signupUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles(new UserFilesValidationPipe()) files: { avatar: ExpressFile; bgImage: ExpressFile },
  ) {
    return this.authService.signup(createUserDto, files.avatar, files.bgImage);
  }

  @UseGuards(AnonymousGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'bgImage', maxCount: 1 },
    ]),
  )
  @Post('signup-coach')
  signupCoach(
    @Body() createCoachDto: CreateCoachDto,
    @UploadedFiles(new UserFilesValidationPipe()) files: { avatar: ExpressFile; bgImage: ExpressFile },
  ) {
    return this.authService.signup(createCoachDto, files.avatar, files.bgImage);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: RequestExpress) {
    return req.accessToken ? { accessToken: req.accessToken } : this.authService.verifyUser(loginDto);
  }

  @Post('refresh')
  refresh(@Body() { refreshToken }: RefreshDto) {
    return this.authService.verifyRefreshToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Body() { refreshToken }: RefreshDto) {
    this.authService.logout(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('check')
  check(@UserId() id: string) {
    return this.authService.findUserById(id);
  }
}