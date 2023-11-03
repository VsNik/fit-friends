import { Gender, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TrainingInfoRdo {
  @ApiProperty({ description: 'Уникальный идентификатор тренировки', example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f' })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Название тренировки',
    example: 'Some training',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Фоновая картинка',
    example: 'http://localhost:5000/bg-training/training-4.png',
  })
  @Expose()
  bgImage: string;

  @ApiProperty({
    description: 'Уровень подготовки',
    example: 'professional',
  })
  @Expose()
  level: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировки',
    example: 'boxing',
  })
  @Expose()
  type: TrainingType;

  @ApiProperty({
    description: 'Цена тренировки',
    example: 5000,
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Количество калорий',
    example: 3000,
  })
  @Expose()
  calories: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Some decription text',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Пол пользователя',
    example: Gender.Male,
  })
  @Expose()
  gender: Gender;

  @ApiProperty({
    description: 'Рейтинг тренировки',
    example: 5,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'Признак специального предложения',
    example: true,
  })
  @Expose()
  isSpecial: boolean;

  @ApiProperty({
    description: 'Дата создания тренировки',
    example: '2012-01-23T17:07:00.565Z',
  })
  @Expose()
  createdAt: string;
}
