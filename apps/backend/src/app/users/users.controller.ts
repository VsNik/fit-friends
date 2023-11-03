import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExpressFile, IUser, Location, Pagination, Role, SortDirection, TrainingLevel, TrainingType, UserSorting, UsersFilter } from '@fit-friends/libs/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserFilesValidatePipe } from '@fit-friends/libs/pipes';
import { fillObject, getLimit } from '@fit-friends/libs/utils';
import { SuccessRdo, UpdateUserRdo, UserCollectionRdo, UserRdo } from '@fit-friends/libs/rdo';
import { ApiBearerAuth, ApiConsumes, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateDto } from './dto/update.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'sorting', required: false, enum: UserSorting})
  @ApiQuery({name: 'direction', required: false, enum: SortDirection})
  @ApiQuery({name: 'location', required: false, enum: Location})
  @ApiQuery({name: 'type', required: false, enum: TrainingType, isArray: true})
  @ApiQuery({name: 'level', required: false, enum: TrainingLevel})
  @ApiOkResponse({ type: UserCollectionRdo })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiOperation({ summary: 'Список (каталог) пользователей' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get()
  async usersList(@Query() query: UsersFilter): Promise<UserCollectionRdo> {
    const limit = getLimit(query.limit);
    const filter = plainToInstance(UsersFilter, { ...query, limit });
    const [data, total] = await this.usersService.all(filter);
    return this.mapUserCollection(data, total, filter.page);
  }

  @ApiOkResponse({ type: UserRdo })
  @ApiOperation({ summary: 'Детальная информация о пользователе (Карточка пользователя)' })
  @UseGuards(AuthGuard)
  @Get(':id/show')
  async userDetail(@Param('id') id: string): Promise<UserRdo> {
    const user = await this.usersService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @ApiOkResponse({ type: UpdateUserRdo })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Редактирование информации о пользователе / тренере' })
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'certificate', maxCount: 1 },
    ]),
  )
  @Put()
  async update(
    @Body() dto: UpdateDto,
    @UserId() userId: string,
    @UploadedFiles(new UserFilesValidatePipe(true)) files: { avatar: ExpressFile; certificate: ExpressFile },
  ): Promise<UpdateUserRdo> {
    const user = await this.usersService.update(userId, dto, files.avatar, files.certificate);
    return fillObject(UpdateUserRdo, user);
  }

  @ApiOkResponse({ type: SuccessRdo })
  @ApiOperation({ summary: 'Добавить в друзья / удалить из друзей' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/follow')
  async followUnfollow(@Param('id') followId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.followUnfollow(followId, currentUserId);
    return fillObject(SuccessRdo, { success: result });
  }

  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'direction', required: false, enum: SortDirection})
  @ApiOkResponse({ type: UserCollectionRdo })
  @ApiOperation({ summary: 'Список друзей тренера' })
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('friends-coach')
  async getCoachFriends(@UserId() userId: string, @Query() query: Pagination): Promise<UserCollectionRdo> {
    const limit = getLimit(query.limit);
    const pagination = plainToInstance(Pagination, { ...query, limit });
    const [data, total] = await this.usersService.getFollowing(userId, pagination);
    return this.mapUserCollection(data, total, pagination.page);
  }

  @ApiQuery({name: 'limit', required: false, type: Number})
  @ApiQuery({name: 'page', required: false, type: Number})
  @ApiQuery({name: 'direction', required: false, enum: SortDirection})
  @ApiOkResponse({ type: UserCollectionRdo })
  @ApiOperation({ summary: 'Список друзей пользователя' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get('friends-user')
  async getUserFriendss(@UserId() userId: string, @Query() query: Pagination): Promise<UserCollectionRdo> {
    const limit = getLimit(query.limit);
    const pagination = plainToInstance(Pagination, { ...query, limit });
    const [data, total] = await this.usersService.getFollowers(userId, pagination);
    return this.mapUserCollection(data, total, pagination.page);
  }

  @ApiOkResponse({ type: SuccessRdo })
  @ApiOperation({ summary: ' Подписатся / отписатся на новые тренеровки тренера' })
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':coachId/subscribe')
  async subscribeUnsubscribe(@Param('coachId') coachId: string, @UserId() currentUserId: string): Promise<SuccessRdo> {
    const result = await this.usersService.subscribeUnsubscribe(coachId, currentUserId);
    return fillObject(SuccessRdo, { success: result });
  }

  private mapUserCollection(users: IUser[], total: number, page: number) {
    return fillObject(UserCollectionRdo, {
      data: users.map((user) => fillObject(UserRdo, user)),
      page,
      total,
    });
  }
}

