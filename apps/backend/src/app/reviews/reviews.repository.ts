import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '@fit-friends/libs/types';
import { IReviewsRepository } from './entities/reviews-repository.interface';
import { Review } from './models/review.model';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewsRepository implements IReviewsRepository {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
  ) {}

  async save(entity: ReviewEntity): Promise<ReviewEntity> {
    return this.repository.save(entity);
  }

  async getByTrainingId(id: string, pagination: Pagination): Promise<[ReviewEntity[], number]> {
    const [data, count] = await this.repository.findAndCount({
      where: {
        training: { id },
      },
      order: {
        createdAt: pagination.direction,
      },
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
      relations: { training: true, user: true },
    });
    return [data.map((review) => ReviewEntity.create(review)), count];
  }
}
