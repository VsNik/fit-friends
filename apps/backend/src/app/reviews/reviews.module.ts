import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './models/review.model';
import { UsersModule } from '../users/users.module';
import { TrainingsModule } from '../trainings/trainings.module';
import { REVIEWS_REPO } from './entities/reviews-repository.interface';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UsersModule, TrainingsModule],
  providers: [
    ReviewsService,
    {
      provide: REVIEWS_REPO,
      useClass: ReviewsRepository,
    },    
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
