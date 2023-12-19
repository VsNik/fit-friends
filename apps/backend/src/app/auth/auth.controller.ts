import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile, RequestExpress } from '@fit-friends/libs/types';
import { AvatarValidatePipe } from '@fit-friends/libs/pipes';
import { LoggedRdo, UserProfileRdo, UserRdo } from '@fit-friends/libs/rdo';
import { fillObject } from '@fit-friends/libs/utils';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCoachDto } from './dto/create-coach.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserId } from './decorators/user-id.decorator';
import { AnonymousGuard } from './guards/anonymous.guard';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiCreatedResponse({ type: UserRdo })
  @UseGuards(AnonymousGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @UploadedFile(AvatarValidatePipe) avatar: ExpressFile) {
    const createdUser = await this.authService.signup(signupDto, avatar);
    return fillObject(UserProfileRdo, createdUser);
  }

  @ApiOperation({ summary: 'Создание профиля пользователя' })
  @ApiCreatedResponse({ type: UserProfileRdo })
  @Post('create/user/:id')
  async createUserProfile(@Param('id') userId: string, @Body() createUserDto: CreateUserDto): Promise<UserProfileRdo> {
    const createdUser = await this.authService.createUserProfile(userId, createUserDto);
    return fillObject(UserProfileRdo, createdUser);
  }

  @ApiOperation({ summary: 'Создание профиля тренира' })
  @ApiCreatedResponse({ type: UserProfileRdo })
  @UseInterceptors(FileInterceptor('certificate'))
  @Post('create/coach/:id')
  async createCoachProfile(
    @Param('id') userId: string,
    @Body() createCoachDto: CreateCoachDto,
    @UploadedFile() certificate: ExpressFile,
  ): Promise<UserProfileRdo> {
    const createdCoach = await this.authService.createCoachProfile(userId, createCoachDto, certificate);
    return fillObject(UserProfileRdo, createdCoach);
  }

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiOkResponse({ type: LoggedRdo })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: RequestExpress): Promise<LoggedRdo> {
    const logged = this.authService.verifyUser(loginDto, req);
    return fillObject(LoggedRdo, logged);
  }

  @ApiOperation({ summary: 'Обновление "access, refresh" токенов' })
  @ApiOkResponse({ type: LoggedRdo })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshDto): Promise<LoggedRdo> {
    const logged = await this.authService.verifyRefreshToken(refreshToken);
    return fillObject(LoggedRdo, logged);
  }

  @ApiOperation({ summary: 'Выход из профиля' })
  @ApiNoContentResponse({ description: 'No Content' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Body() { refreshToken }: RefreshDto) {
    return await this.authService.logout(refreshToken);
  }

  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @ApiOkResponse({ type: UserProfileRdo })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('check')
  async check(@UserId() id: string): Promise<UserProfileRdo> {
    const authUser = await this.authService.findUserById(id);
    return fillObject(UserProfileRdo, authUser);
  }
}
