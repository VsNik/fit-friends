import { IAuthToken, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class UserProfileRdo extends UserRdo {
  @ApiProperty({ description: 'Уровень подготовки', example: TrainingLevel.Professional })
  @Expose()
  trainingLevel: TrainingLevel;

  @ApiProperty({ description: 'Тип тренировок', example: [TrainingType.Crossfit, TrainingType.Boxing] })
  @Expose()
  trainingType: TrainingType[];

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

  @ApiProperty({ description: 'Сертификат тренера', example: 'http://localhost:5000/bg-user/user-coach-photo1.jpg' })
  @Expose()
  certificate?: string;

  @ApiProperty({ description: 'Личные заслуги тренира', example: 'Coach merits text' })
  @Expose()
  merits?: string;

  @ApiProperty({ description: 'Готовность к персональным тренировкам', example: true })
  @Expose()
  personalTraining?: boolean;

  @Expose()
  isFollow?: boolean;

  @Expose()
  token?: IAuthToken;
}
