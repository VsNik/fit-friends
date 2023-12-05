import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExpressFile } from '@fit-friends/libs/types';
import { IUser, Location, Role, SortDirection, TrainingLevel, TrainingType, UserSorting } from '@fit-friends/shared';
import { Pagination, UsersFilter } from '@fit-friends/filters';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UserFilesValidatePipe } from '@fit-friends/libs/pipes';
import { fillObject, getLimit } from '@fit-friends/libs/utils';
import { SuccessRdo, UpdateUserRdo, UserCollectionRdo, UserProfileRdo, UserRdo } from '@fit-friends/libs/rdo';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateDto } from './dto/update.dto';
import { CertificateDto } from './dto/certificate.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Список (каталог) пользователей' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'sorting', required: false, enum: UserSorting })
  @ApiQuery({ name: 'direction', required: false, enum: SortDirection })
  @ApiQuery({ name: 'location', required: false, enum: Location })
  @ApiQuery({ name: 'type', required: false, enum: TrainingType, isArray: true })
  @ApiQuery({ name: 'level', required: false, enum: TrainingLevel })
  @ApiOkResponse({ type: UserCollectionRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get()
  async usersList(@Query() query: UsersFilter): Promise<UserCollectionRdo> {
    const limit = getLimit(query.limit);
    const filter = plainToInstance(UsersFilter, { ...query, limit });
    const [data, total] = await this.usersService.all(filter);
    return this.mapUserCollection(data, total, filter.page);
  }

  @ApiOperation({ summary: 'Детальная информация о пользователе (Карточка пользователя)' })
  @ApiOkResponse({ type: UserProfileRdo })
  @UseGuards(AuthGuard)
  @Get(':id/show')
  async userDetail(@Param('id', new ParseUUIDPipe()) id: string, @UserId() currentUserId: string): Promise<UserProfileRdo> {
    const user = await this.usersService.getDetails(id, currentUserId);
    return fillObject(UserProfileRdo, user);
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Редактирование информации о пользователе / тренере' })
  @ApiOkResponse({ type: UpdateUserRdo })
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'certificate', maxCount: 1 },
    ]),
  )
  @Patch()
  async update(
    @Body() dto: UpdateDto,
    @UserId() userId: string,
    @UploadedFiles(new UserFilesValidatePipe(true)) files: { avatar: ExpressFile; certificate: ExpressFile },
  ): Promise<UpdateUserRdo> {
    const user = await this.usersService.update(userId, dto, files.avatar, files.certificate);
    return fillObject(UpdateUserRdo, user);
  }

  @ApiOperation({ summary: 'Добавить в друзья / удалить из друзей' })
  @ApiOkResponse({ type: SuccessRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/follow')
  async followUnfollow(@Param('id', new ParseUUIDPipe()) followId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.followUnfollow(followId, currentUserId);
    return fillObject(SuccessRdo, { success: result });
  }

  @ApiOperation({ summary: 'удалить из друзей для тренера' })
  @ApiOkResponse({ type: SuccessRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/coach-unfollow')
  async unfollowForCoach(@Param('id', new ParseUUIDPipe()) followId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.unfollowForCoach(followId, currentUserId);
    return fillObject(SuccessRdo, { success: result });
  }

  @ApiOperation({ summary: 'Список друзей тренера' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'direction', required: false, enum: SortDirection })
  @ApiOkResponse({ type: UserCollectionRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('friends-coach')
  async getCoachFriends(@UserId() userId: string, @Query() query: Pagination): Promise<UserCollectionRdo> {
    const limit = getLimit(query.limit);
    const pagination = plainToInstance(Pagination, { ...query, limit });
    const [data, total] = await this.usersService.getFollowing(userId, pagination);
    return this.mapUserCollection(data, total, pagination.page);
  }

  @ApiOperation({ summary: 'Список друзей пользователя' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'direction', required: false, enum: SortDirection })
  @ApiOkResponse({ type: UserCollectionRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get('friends-user')
  async getUserFriendss(@UserId() userId: string, @Query() query: Pagination): Promise<UserCollectionRdo> {
    const limit = getLimit(query.limit);
    const pagination = plainToInstance(Pagination, { ...query, limit });
    const [data, total] = await this.usersService.getFollowers(userId, pagination);
    return this.mapUserCollection(data, total, pagination.page);
  }

  @ApiOperation({ summary: ' Подписатся / отписатся на новые тренеровки тренера' })
  @ApiOkResponse({ type: SuccessRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':coachId/subscribe')
  async subscribeUnsubscribe(@Param('coachId', new ParseUUIDPipe()) coachId: string, @UserId() currentUserId: string): Promise<SuccessRdo> {
    const result = await this.usersService.subscribeUnsubscribe(coachId, currentUserId);
    return fillObject(SuccessRdo, { success: result });
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: ' Добавить сертификат тренера' })
  @ApiCreatedResponse({type: UserProfileRdo})
  @UseInterceptors(FileInterceptor('certificate'))
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Post('certificate')
  async addCertificate(@UserId() userId: string, @UploadedFile() certificate: ExpressFile) {
    const user = await this.usersService.addCertificate(userId, certificate);
    return fillObject(UserProfileRdo, user);
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: ' Изменить сертификат тренера' })  
  @ApiOkResponse({type: UserProfileRdo})
  @UseInterceptors(FileInterceptor('certificate'))
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Patch('certificate')
  async updateCertificate(@Body() {src}: CertificateDto, @UserId() userId: string, @UploadedFile() certificate: ExpressFile) {
    const user = await this.usersService.updateCertificate(userId, src, certificate);
    return fillObject(UserProfileRdo, user);
  }

  @ApiOperation({ summary: ' Удалить сертификат тренера' })
  @ApiOkResponse({type: UserProfileRdo})
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Post('certificate/remove')
  async deleteCertificate(@Body() {src}: CertificateDto, @UserId() userId: string) {
    const user = await this.usersService.deleteSertificate(userId, src);
    return fillObject(UserProfileRdo, user);
  }

  private mapUserCollection(users: IUser[], total: number, page: number) {
    return fillObject(UserCollectionRdo, {
      data: users.map((user) => fillObject(UserRdo, user)),
      page,
      total,
    });
  }
}
