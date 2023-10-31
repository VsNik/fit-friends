import { Injectable } from '@nestjs/common';
import { IReviewsRepository } from './entities/reviews-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './models/review.model';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Pagination } from '@fit-friends/libs/types';

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
        createdAt: 'DESC',
      },
      take: pagination.limit,
      skip: pagination.limit * (pagination.page - 1),
      relations: { training: true, user: true },
    });
    return [data.map((review) => ReviewEntity.create(review)), count];
  }
}
