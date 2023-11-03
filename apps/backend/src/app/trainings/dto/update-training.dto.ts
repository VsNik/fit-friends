import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  DURATION_VALUES,
  GENDER_VALUES,
  LEVEL_VALUES,
  LOSE_CALORY_IS_NUMBER,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  PRICE_IS_NUMBER,
  SPECIAL_IS_BOOLEAN,
  TRAININGTYPE_VALUES,
  TRAINING_DESCRIPTION_IS_STRING,
  TRAINING_DESCRIPTION_LENGTH,
  TRAINING_TITLE_IS_STRING,
  TRAINING_TITLE_LENGTH,
  TrainingValidate,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrainingDto {

  @ApiProperty({
    description: 'Название тренировки',
    example: 'Some training',
    required: false,
  })
  @IsString({ message: TRAINING_TITLE_IS_STRING })
  @Length(TrainingValidate.TitleMinLength, TrainingValidate.TitleMaxLength, { message: TRAINING_TITLE_LENGTH })
  @IsOptional()
  readonly title: string;

  @ApiProperty({
    enum: TrainingLevel,
    description: 'Уровень подготовки',
    example: 'professional',
    required: false,
  })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsOptional()
  readonly level: TrainingLevel;

  @ApiProperty({
    enum: TrainingType,
    description: 'Тип тренировки',
    example: TrainingType.Boxing,
    required: false,
  })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsOptional()
  readonly type: TrainingType;

  @ApiProperty({
    enum: TrainingDuration,
    description: 'Продолжительность',
    example: TrainingDuration.Normal,
    required: false,
  })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsOptional()
  readonly duration: TrainingDuration;

  @ApiProperty({
    description: 'Цена тренировки',
    example: 5000,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({ allowInfinity: true, allowNaN: true }, { message: PRICE_IS_NUMBER })
  @IsPositive({ message: PRICE_IS_NUMBER })
  @IsOptional()
  readonly price: number;

  @ApiProperty({
    description: 'Количество калорий',
    example: 3000,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: LOSE_CALORY_IS_NUMBER })
  @Min(TrainingValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(TrainingValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsOptional()
  readonly calories: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Some decription text',
    required: false,
  })
  @IsString({ message: TRAINING_DESCRIPTION_IS_STRING })
  @Length(TrainingValidate.DescriptionMinLength, TrainingValidate.DescriptionMaxLength, { message: TRAINING_DESCRIPTION_LENGTH })
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    enum: Gender,
    description: 'Пол пользователя',
    example: Gender.Male,
    required: false,
  })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsOptional()
  readonly gender: Gender;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Видео тренировки',
  })
  @IsOptional()
  readonly video: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Признак специального предложения',
    example: true,
    required: false,
  })
  @Type(() => Boolean)
  @IsBoolean({ message: SPECIAL_IS_BOOLEAN })
  @IsOptional()
  readonly isSpecial: boolean;
}
