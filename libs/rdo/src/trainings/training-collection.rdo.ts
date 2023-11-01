import { Expose } from 'class-transformer';
import { TrainingRdo } from './training.rdo';
import { TrainingStatisticRdo } from './training-statistic.rdo';

export class TrainingCollectionRdo {
  @Expose()
  data: TrainingRdo[] | TrainingStatisticRdo[];

  @Expose()
  page: number;

  @Expose()
  total: number;
}
