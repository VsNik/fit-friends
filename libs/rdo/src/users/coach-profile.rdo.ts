import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';

export class CoachProfileRdo extends UserRdo {
  @ApiProperty({ description: 'Количество калорий для сброса', example: 'http://localhost:5000/bg-user/user-coach-photo1.jpg' })
  @Expose()
  certificate?: string;

  @ApiProperty({ description: 'Личные заслуги тренира', example: 'Coach merits text' })
  @Expose()
  merits?: string;

  @ApiProperty({ description: 'Готовность к персональным тренировкам', example: true })
  @Expose()
  personalTraining?: boolean;
}
