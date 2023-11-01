import { Expose } from 'class-transformer';
import { ReviewRdo } from './review.rdo';

export class ReviewCollectionRdo {
  @Expose()
  data: ReviewRdo[];

  @Expose()
  page: number;

  @Expose()
  total: number;
}
