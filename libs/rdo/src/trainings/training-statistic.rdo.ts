import { Expose } from 'class-transformer';
import { TrainingRdo } from './training.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class TrainingStatisticRdo extends TrainingRdo {

  @ApiProperty({
    description: 'Количество проданных тренировок',
    example: 10,
  })
  @Expose()
  ordersCount?: number;

  @ApiProperty({
    description: 'Заработанная сумма',
    example: 50000,
  })
  @Expose()
  ordersSumm?: number;
}
