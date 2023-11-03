import { Expose } from 'class-transformer';
import { UserRdo } from '../users/user.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingInfoRdo } from '../trainings/training-info.rdo';

export class ReviewRdo {
  @ApiProperty({ description: 'Уникальный идентификатор отзыва', example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f' })
  @Expose()
  readonly id: string;

  @ApiProperty({ type: UserRdo })
  @Expose()
  readonly user: UserRdo;

  @ApiProperty({ type: TrainingInfoRdo })
  @Expose()
  readonly training: TrainingInfoRdo;

  @ApiProperty({
    description: 'Оценка тренировки',
    example: 5,
  })
  @Expose()
  readonly rating: number;

  @ApiProperty({
    description: 'Текст отзыва',
    example: 'Хорошая тренировка',
  })
  @Expose()
  readonly text: string;
  @ApiProperty({
    description: 'Дата создания отзыва',
    example: '2012-01-23T17:07:00.565Z',
  })
  @Expose()
  readonly createdAt: string;
}
