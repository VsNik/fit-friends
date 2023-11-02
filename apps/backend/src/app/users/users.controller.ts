import { Body, Controller, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExpressFile, Pagination, Role, UsersFilter } from '@fit-friends/libs/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserFilesValidatePipe } from '@fit-friends/libs/pipes';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateDto } from './dto/update.dto';
import { fillObject } from '@fit-friends/libs/utils';
import { UserCollectionRdo, UserRdo } from '@fit-friends/libs/rdo';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Список (каталог) пользователей
  @Roles(Role.User)
  @UseGuards(RoleGuard)  
  @Get()
  async usersList(@Query() query: UsersFilter): Promise<UserCollectionRdo> {
    const filter = plainToInstance(UsersFilter, query);
    const [data, total] = await this.usersService.all(filter);
    return fillObject(UserCollectionRdo, {
      data: data.map((user) => fillObject(UserRdo, user)),
      page: filter.page,
      total,
    });
  }

  // Детальная информация о пользователе (Карточка пользователя)
  @UseGuards(AuthGuard)
  @Get('show/:id')
  async userDetail(@Param('id') id: string): Promise<UserRdo> {
    const user = await this.usersService.getUser(id);
    return fillObject(UserRdo, user);
  }

  // Редактирование информации о пользователе / тренере
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]))
  @Put()
  async update(
    @Body() dto: UpdateDto, 
    @UserId() userId: string, 
    @UploadedFiles(new UserFilesValidatePipe(true)) files: { avatar: ExpressFile; certificate: ExpressFile }
  ): Promise<UserRdo> {
    const user = await this.usersService.update(userId, dto, files.avatar, files.certificate);
    return fillObject(UserRdo, user);
  }

  // Добавить в друзья / удалить из друзей
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post('follow/:id')
  async followUnfollow(@Param('id') followId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.followUnfollow(followId, currentUserId);
    return { success: result };
  }

  // Список друзей тренера
  @Roles(Role.Coach)
  @UseGuards(RoleGuard)
  @Get('followings')
  async getFollowing(@UserId() userId: string, @Query() query: Pagination): Promise<UserCollectionRdo> {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.usersService.getFollowing(userId, pagination);
    return fillObject(UserCollectionRdo, {
      data: data.map((user) => fillObject(UserRdo, user)),
      page: pagination.page,
      total,
    });
  }

  // Список друзей пользователя
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Get('followers')
  async getFollowers(@UserId() userId: string, @Query() query: Pagination): Promise<UserCollectionRdo> {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.usersService.getFollowers(userId, pagination);
    return fillObject(UserCollectionRdo, {
      data: data.map((user) => fillObject(UserRdo, user)),
      page: pagination.page,
      total,
    });
  }

  // Подписатся / отписатся на новые тренеровки тренера
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post('subscribe/:id')
  async subscribeUnsubscribe(@Param('id') subscribeId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.subscribeUnsubscribe(subscribeId, currentUserId);
    return { success: result };
  }
}
