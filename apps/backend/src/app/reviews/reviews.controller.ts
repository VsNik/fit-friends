import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserId } from '../auth/decorators/user-id.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { Pagination, Role } from '@fit-friends/libs/types';
import { plainToInstance } from 'class-transformer';
import { AuthGuard } from '../auth/guards/auth.guard';
import { fillObject } from '@fit-friends/libs/utils';
import { ReviewCollectionRdo, ReviewRdo, TrainingRdo, UserRdo } from '@fit-friends/libs/rdo';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Создание отзыва к тренировке
  @Roles(Role.User)
  @UseGuards(RoleGuard)
  @Post(':id')
  async create(@Body() dto: CreateReviewDto, @Param('id') trainingId: string, @UserId() currentUserId: string): Promise<ReviewRdo> {
    const review = await this.reviewsService.create(dto, trainingId, currentUserId);
    return fillObject(ReviewRdo, {...review, user: fillObject(UserRdo, review.user), training: fillObject(TrainingRdo, review.training)});
  }

  // Список отзывов к тренировке
  @UseGuards(AuthGuard)
  @Get(':id')
  async getForTraining(@Param('id') trainingId: string, @UserId() currentUserId: string, @Query() query: Pagination) {
    const pagination = plainToInstance(Pagination, query);
    const [data, total] = await this.reviewsService.getForTraining(trainingId, currentUserId, pagination);
    return fillObject(ReviewCollectionRdo, {
      data: data.map((review) => fillObject(ReviewRdo, {...review, user: fillObject(UserRdo, review.user), training: fillObject(TrainingRdo, review.training)})),
      page: pagination.page,
      total,
    });
  }
}
