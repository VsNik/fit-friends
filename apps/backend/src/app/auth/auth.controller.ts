import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
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
  @Post('signup-user')
  signupUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(AnonymousGuard)
  @Post('signup-coach')
  signupCoach(@Body() createCoachDto: CreateCoachDto) {
    return this.authService.signup(createCoachDto);
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
