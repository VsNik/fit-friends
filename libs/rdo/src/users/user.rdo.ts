import { Expose } from 'class-transformer';
import { Gender, Role, Location, TrainingType } from '@fit-friends/shared';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
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

  @Expose()
  trainingType: TrainingType[];

  @ApiProperty({ description: 'Признак готовности к тренировкам', example: true })
  @Expose()
  ready?: boolean;

  @ApiProperty({ description: 'Признак готовности персонально тренировать', example: true })
  @Expose()
  personalTraining?: boolean;

  @ApiProperty({ description: 'Дата регистрации', example: '2014-03-14T15:07:48.845Z' })
  @Expose()
  createdAt: string;
}
