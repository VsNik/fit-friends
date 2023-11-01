import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IReviewsRepository, REVIEWS_REPO } from './entities/reviews-repository.interface';
import { UsersService } from '../users/users.service';
import { TrainingsService } from '../trainings/trainings.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { IReview, Pagination } from '@fit-friends/libs/types';

const TRAINING_NOT_FOUND_ERROR = 'Training not found.';
const UNAUTHORIZED_ERROR = 'Unauthorized.';

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
      throw new UnauthorizedException(UNAUTHORIZED_ERROR);
    }

    const training = await this.trainingsService.findById(trainingId);

    if (!training) {
      throw new NotFoundException(TRAINING_NOT_FOUND_ERROR);
    }

    const reviewEntity = ReviewEntity.create({ ...dto, user, training });
    training.updateRating(dto.rating);
    const savedReview = await this.reviewsRepository.save(reviewEntity);

    return savedReview.toObject();
  }

  async getForTraining(trainingId: string, currentUserId: string, pagination: Pagination): Promise<[IReview[], number]> {
    const user = await this.usersService.findById(currentUserId);
    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR);
    }
    const [data, count] = await this.reviewsRepository.getByTrainingId(trainingId, pagination);
    return [data.map((item) => item.toObject()), count];
  }
}
