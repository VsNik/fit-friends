import { Expose } from 'class-transformer';
import { ReviewRdo } from './review.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRdo } from '../pagination.rdo';

export class ReviewCollectionRdo extends PaginationRdo {
  @ApiProperty({ type: [ReviewRdo] })
  @Expose()
  data: ReviewRdo[];
}
