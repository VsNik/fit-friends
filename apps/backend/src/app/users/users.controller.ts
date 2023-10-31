import { Body, Controller, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExpressFile, Pagination, Role, UsersFilter } from '@fit-friends/libs/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserFilesValidationPipe } from '@fit-friends/libs/pipes';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.User)
  @Get()
  async allUsers(@Query() query: UsersFilter) {
    const filter = plainToInstance(UsersFilter, query);
    const [data, total] = await this.usersService.all(filter);
    return {
      data,
      page: filter.page,
      total,
    };
  }

  @UseGuards(AuthGuard)
  @Get('show/:id')
  async show(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return user.toObject();
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]))
  @Put()
  async update(
    @Body() dto: UpdateDto, 
    @UserId() userId: string, 
    @UploadedFiles(new UserFilesValidationPipe(true)) files: { avatar: ExpressFile; certificate: ExpressFile }
  ) {
    return this.usersService.update(userId, dto, files.avatar, files.certificate);
  }

  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post('follow/:id')
  async followUnfollow(@Param('id') followId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.followUnfollow(followId, currentUserId);
    return { success: result };
  }

  @UseGuards(AuthGuard)
  @Get('followings')
  async getFollowing(@UserId() userId: string, @Query() query: Pagination) {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.usersService.getFollowing(userId, pagination);
    return {
      data,
      page: pagination.page,
      total,
    };
  }

  @UseGuards(AuthGuard)
  @Get('followers')
  async getFollowers(@UserId() userId: string, @Query() query: Pagination) {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.usersService.getFollowers(userId, pagination);
    return {
      data,
      page: pagination.page,
      total,
    };
  }

  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post('subscribe/:id')
  async subscribeUnsubscribe(@Param('id') subscribeId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.subscribeUnsubscribe(subscribeId, currentUserId);
    return { success: result };
  }
}
