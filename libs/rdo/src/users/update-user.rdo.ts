import { Gender, Role, Location, TrainingLevel, TrainingType, TrainingDuration } from '@fit-friends/libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateUserRdo {
  @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'Ivan' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Email адрес пользователя', example: 'ivan@app.test' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Аватар пользователя', example: 'http://localhost:5000/bg-user/user-coach-photo1.jpg' })
  @Expose()
  avatar?: string;

  @ApiProperty({ description: 'Пол пользователя', example: Gender.Male })
  @Expose()
  gender: Gender;

  @ApiProperty({ description: 'Дата рождения', example: '01.01.1991' })
  @Expose()
  birthDay?: string;

  @ApiProperty({ description: 'Пол пользователя', example: Role.User })
  @Expose()
  role: Role;

  @ApiProperty({ description: 'Описание пользователя', example: 'Ivan description' })
  @Expose()
  bio?: string;

  @ApiProperty({ description: 'Локация пользователя', example: Location.Pionerskaya })
  @Expose()
  location: Location;

  @ApiProperty({ description: 'Фоновое изображение', example: 'http://localhost:5000/bg-user/user-coach-photo1.jpg' })
  @Expose()
  bgImage: string;

  @ApiProperty({ description: 'Уровень подготовки', example: TrainingLevel.Professional })
  @Expose()
  trainingLevel: TrainingLevel;

  @ApiProperty({ description: 'Тип тренировок', example: [TrainingType.Crossfit, TrainingType.Boxing] })
  @Expose()
  trainingType: TrainingType[];

  @ApiProperty({ description: 'Дата регистрации', example: '2014-03-14T15:07:48.845Z' })
  @Expose()
  createdAt: string;

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
