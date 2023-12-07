import { IReview } from './review.interface';

export interface IReviewCollection {
  data: IReview[];
  page: number;
  total: number;
}
