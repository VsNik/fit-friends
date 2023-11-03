import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile } from '@fit-friends/libs/types';
import { AvatarValidatePipe, UserFilesValidatePipe } from '@fit-friends/libs/pipes';
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
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiCreatedResponse({type: UserProfileRdo})
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @UseGuards(AnonymousGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('signup-user')
  async signupUser(@Body() createUserDto: CreateUserDto, @UploadedFile(AvatarValidatePipe) avatar: ExpressFile): Promise<UserProfileRdo> {
    const createdUser = await this.authService.signup(createUserDto, avatar);
    return fillObject(UserProfileRdo, createdUser);
  }

  @ApiCreatedResponse({type: CoachProfileRdo})
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Регистрация тренера' })
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
    @UploadedFiles(new UserFilesValidatePipe()) files: { avatar: ExpressFile; certificate: ExpressFile },
  ): Promise<CoachProfileRdo> {
    const createdCoach = await this.authService.signup(createCoachDto, files.avatar, files.certificate);
    return fillObject(CoachProfileRdo, createdCoach);
  }

  @ApiOkResponse({type: LoggedRdo})
  @ApiOperation({ summary: 'Вход в систему' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: RequestExpress): Promise<LoggedRdo> {
    const logged = req.accessToken ? { accessToken: req.accessToken } : await this.authService.verifyUser(loginDto);
    return fillObject(LoggedRdo, logged);
  }

  @ApiOkResponse({type: LoggedRdo})
  @ApiOperation({ summary: 'Обновление "access, refresh" токенов' })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() { refreshToken }: RefreshDto): Promise<LoggedRdo> {
    const logged = await this.authService.verifyRefreshToken(refreshToken);
    return fillObject(LoggedRdo, logged);
  }

  @ApiOperation({ summary: 'Выход из профиля' })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Body() { refreshToken }: RefreshDto) {
    this.authService.logout(refreshToken);
  }

  @ApiOkResponse({type: UserRdo})
  @ApiOperation({ summary: 'Получить текущего пользователя' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('check')
  async check(@UserId() id: string): Promise<UserRdo> {
    const authUser = await this.authService.findUserById(id);
    return fillObject(UserRdo, authUser);
  }
}
