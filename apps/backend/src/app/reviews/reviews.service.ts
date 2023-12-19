import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IReviewsRepository, REVIEWS_REPO } from './entities/reviews-repository.interface';
import { UsersService } from '../users/users.service';
import { TrainingsService } from '../trainings/trainings.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { IReview } from '@fit-friends/shared';
import { Pagination } from '@fit-friends/filters';
import { AppError } from '@fit-friends/libs/validation';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject(REVIEWS_REPO)
    private readonly reviewsRepository: IReviewsRepository,
    private readonly usersService: UsersService,
    private readonly trainingsService: TrainingsService,
  ) {}

  async create(dto: CreateReviewDto, trainingId: string, currentUserId: string) {
    const user = await this.usersService.findById(currentUserId);
    if (!user) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }

    const training = await this.trainingsService.findById(trainingId);

    if (!training) {
      throw new NotFoundException(AppError.TrainingNotFound);
    }

    const reviewEntity = ReviewEntity.create({ ...dto, user, training });
    training.updateRating(dto.rating);
    const savedReview = await this.reviewsRepository.save(reviewEntity);

    return savedReview.toObject();
  }

  async getForTraining(trainingId: string, currentUserId: string, pagination: Pagination): Promise<[IReview[], number]> {
    const user = await this.usersService.findById(currentUserId);
    if (!user) {
      throw new UnauthorizedException(AppError.Unauthorized);
    }
    const [data, count] = await this.reviewsRepository.getByTrainingId(trainingId, pagination);
    return [data.map((item) => item.toObject()), count];
  }
}
