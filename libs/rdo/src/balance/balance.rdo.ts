import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingInfoRdo } from '../trainings/training-info.rdo';

export class BalanceRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор баланса',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f',
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: TrainingInfoRdo,
  })
  @Expose()
  training: TrainingInfoRdo;

  @ApiProperty({
    description: 'Количество тренировок',
    example: 10,
  })
  @Expose()
  count: number;
}
