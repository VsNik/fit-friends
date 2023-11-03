import { Expose } from 'class-transformer';
import { TrainingRdo } from './training.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRdo } from '../pagination.rdo';

export class TrainingCollectionRdo extends PaginationRdo {
  @ApiProperty({ type: [TrainingRdo] })
  @Expose()
  data: TrainingRdo[];
}
