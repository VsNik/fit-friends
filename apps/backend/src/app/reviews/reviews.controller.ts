import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserId } from '../auth/decorators/user-id.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { Pagination, Role } from '@fit-friends/libs/types';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post(':id')
  async create(@Body() dto: CreateReviewDto, @Param('id') trainingId: string, @UserId() currentUserId: string) {
    const createdReview = await this.reviewsService.create(dto, trainingId, currentUserId);
    return createdReview;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getForTraining(@Param('id') trainingId: string, @UserId() currentUserId: string, @Query() query: Pagination) {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.reviewsService.getForTraining(trainingId, currentUserId, pagination);
    return {
      data,
      page: pagination.page,
      total,
    };
  }
}
