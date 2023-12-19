import { Pagination } from '@fit-friends/filters';
import { ReviewEntity } from './review.entity';

export const REVIEWS_REPO = Symbol('REVIEWS_REPO');

export interface IReviewsRepository {
  save(entity: ReviewEntity): Promise<ReviewEntity>;
  getByTrainingId(id: string, pagination: Pagination): Promise<[ReviewEntity[], number]>;
}
