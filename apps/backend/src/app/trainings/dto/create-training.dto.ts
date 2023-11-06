import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  DURATION_NOT_EMPTY,
  DURATION_VALUES,
  GENDER_NOT_EMPTY,
  GENDER_VALUES,
  LEVEL_NOT_EMPTY,
  LEVEL_VALUES,
  LOSE_CALORY_IS_NUMBER,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  LOSE_CALORY_NOT_EMPTY,
  PRICE_IS_NUMBER,
  PRICE_NOT_EMPTY,
  SPECIAL_IS_BOOLEAN,
  SPECIAL_NOT_EMPTY,
  TRAININGTYPE_VALUES,
  TRAINING_DESCRIPTION,
  TRAINING_DESCRIPTION_IS_STRING,
  TRAINING_DESCRIPTION_LENGTH,
  TRAINING_TITLE_IS_STRING,
  TRAINING_TITLE_LENGTH,
  TRAINING_TITLE_NOT_EMPTY,
  TRAINING_TYPE_NOT_EMPTY,
  TrainingValidate,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Название тренировки',
    example: 'Some training',
  })
  @IsString({ message: TRAINING_TITLE_IS_STRING })
  @Length(TrainingValidate.TitleMinLength, TrainingValidate.TitleMaxLength, { message: TRAINING_TITLE_LENGTH })
  @IsNotEmpty({ message: TRAINING_TITLE_NOT_EMPTY })
  readonly title: string;

  @ApiProperty({
    enum: TrainingLevel,
    description: 'Уровень подготовки',
    example: 'professional',
  })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsNotEmpty({ message: LEVEL_NOT_EMPTY })
  readonly level: TrainingLevel;

  @ApiProperty({
    enum: TrainingType,
    description: 'Тип тренировки',
    example: TrainingType.Boxing,
  })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsNotEmpty({ message: TRAINING_TYPE_NOT_EMPTY })
  readonly type: TrainingType;

  @ApiProperty({
    enum: TrainingDuration,
    description: 'Продолжительность',
    example: TrainingDuration.Normal,
  })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsNotEmpty({ message: DURATION_NOT_EMPTY })
  readonly duration: TrainingDuration;

  @ApiProperty({
    description: 'Цена тренировки',
    example: 5000,
  })
  @Type(() => Number)
  @IsNumber({ allowInfinity: true, allowNaN: true }, { message: PRICE_IS_NUMBER })
  @IsPositive({ message: PRICE_IS_NUMBER })
  @IsNotEmpty({ message: PRICE_NOT_EMPTY })
  readonly price: number;

  @ApiProperty({
    description: 'Количество калорий',
    example: 3000,
  })
  @Type(() => Number)
  @IsNumber({}, { message: LOSE_CALORY_IS_NUMBER })
  @Min(TrainingValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(TrainingValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsNotEmpty({ message: LOSE_CALORY_NOT_EMPTY })
  readonly calories: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Some decription text',
  })
  @IsString({ message: TRAINING_DESCRIPTION_IS_STRING })
  @Length(TrainingValidate.DescriptionMinLength, TrainingValidate.DescriptionMaxLength, { message: TRAINING_DESCRIPTION_LENGTH })
  @IsNotEmpty({ message: TRAINING_DESCRIPTION })
  readonly description: string;

  @ApiProperty({
    enum: Gender,
    description: 'Пол пользователя',
    example: Gender.Male,
  })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsNotEmpty({ message: GENDER_NOT_EMPTY })
  readonly gender: Gender;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'Видео тренировки',
  })
  @IsOptional()
  readonly video: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Признак специального предложения',
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean({ message: SPECIAL_IS_BOOLEAN })
  @IsNotEmpty({ message: SPECIAL_NOT_EMPTY })
  readonly isSpecial: boolean;
}
