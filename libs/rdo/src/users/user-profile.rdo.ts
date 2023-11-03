import { TrainingDuration } from '@fit-friends/libs/types';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';

export class UserProfileRdo extends UserRdo {
  @ApiProperty({ description: 'Продолжительность тренировки', example: TrainingDuration.Normal })
  @Expose()
  trainingDuration?: TrainingDuration;

  @ApiProperty({ description: 'Количество калорий для сброса', example: 1000 })
  @Expose()
  loseCalories?: number;

  @ApiProperty({ description: 'Количество калорий для сжигания', example: 1000 })
  @Expose()
  burnCalories?: number;

  @ApiProperty({ description: 'Готовность к тренировке', example: true })
  @Expose()
  ready?: boolean;
}
