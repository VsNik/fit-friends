import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExpressFile, Pagination, Role, UsersFilter } from '@fit-friends/libs/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserFilesValidationPipe } from '@fit-friends/libs/pipes';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from '../auth/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UpdateCoachDto } from './dto/update-coach.dto';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'bgImage', maxCount: 1 },
    ]),
  )
  @Patch()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UserId() userId: string,
    @UploadedFiles(new UserFilesValidationPipe(true)) files: { avatar: ExpressFile; bgImage: ExpressFile },
  ) {
    return this.usersService.update(userId, updateUserDto, files.avatar, files.bgImage);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'bgImage', maxCount: 1 },
    ]),
  )
  @Patch()
  updateCoach(
    @Body() updateUserDto: UpdateCoachDto,
    @UserId() coachId: string,
    @UploadedFiles(new UserFilesValidationPipe(true)) files: { avatar: ExpressFile; bgImage: ExpressFile },
  ) {
    return this.usersService.update(coachId, updateUserDto, files.avatar, files.bgImage);
  }

  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post('follow/:id')
  async followUnfollow(@Param('id') followId: string, @UserId() currentUserId: string) {
    const result = await this.usersService.followUnfollow(followId, currentUserId);
    return {success: result}
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
}
