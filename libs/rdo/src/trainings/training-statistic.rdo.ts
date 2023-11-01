import { Expose } from 'class-transformer';
import { TrainingRdo } from './training.rdo';

export class TrainingStatisticRdo extends TrainingRdo {
  @Expose()
  ordersCount?: number;

  @Expose()
  ordersSumm?: number;
}
