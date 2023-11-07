import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ExpressFile, RequestExpress } from '@fit-friends/libs/types';
import { AvatarValidatePipe, UserFilesValidatePipe } from '@fit-friends/libs/pipes';
import { LoggedRdo, UserProfileRdo } from '@fit-friends/libs/rdo';
import { fillObject } from '@fit-friends/libs/utils';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCoachDto } from './dto/create-coach.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserId } from './decorators/user-id.decorator';
import { AnonymousGuard } from './guards/anonymous.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiCreatedResponse({ type: UserProfileRdo })
  @UseGuards(UserProfileRdo)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('signup-user')
  async signupUser(@Body() createUserDto: CreateUserDto, @UploadedFile(AvatarValidatePipe) avatar: ExpressFile): Promise<UserProfileRdo> {
    const createdUser = await this.authService.signup(createUserDto, avatar);
    return fillObject(UserProfileRdo, createdUser);
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Регистрация тренера' })
  @ApiCreatedResponse({ type: UserProfileRdo })
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
  ): Promise<UserProfileRdo> {
    const createdCoach = await this.authService.signup(createCoachDto, files.avatar, files.certificate);
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
  @Delete('logout')
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
