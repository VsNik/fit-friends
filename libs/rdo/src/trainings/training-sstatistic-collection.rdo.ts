import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingStatisticRdo } from './training-statistic.rdo';
import { PaginationRdo } from '../pagination.rdo';

export class TrainingStatisticCollectionRdo extends PaginationRdo {
  @ApiProperty({ type: [TrainingStatisticRdo] })
  @Expose()
  data: TrainingStatisticRdo[];
}
