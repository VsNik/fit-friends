import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  UserError,
  TrainingError,
  TrainingValidate,
  GENDER_VALUES,
  LEVEL_VALUES,
  TRAININGTYPE_VALUES,
  DURATION_VALUES,
  TRAINING_TITLE_LENGTH,
  TRAINING_DESCRIPTION_LENGTH,
  LOSE_CALORY_MIN,
  LOSE_CALORY_MAX,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Название тренировки',
    example: 'Some training',
    required: false,
  })
  @IsString({ message: TrainingError.TitleString })
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
  @IsNumber({ allowInfinity: true, allowNaN: true }, { message: TrainingError.PriceNumber })
  @IsPositive({ message: TrainingError.PriceNumber })
  @IsOptional()
  readonly price: number;

  @ApiProperty({
    description: 'Количество калорий',
    example: 3000,
    required: false,
  })
  @Type(() => Number)
  @IsNumber({}, { message: UserError.LoseCaloryNumber })
  @Min(TrainingValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(TrainingValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsOptional()
  readonly calories: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Some decription text',
    required: false,
  })
  @IsString({ message: TrainingError.DescString })
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
  @Transform(({ value }) => (value && value === 'true') || value === true || value === 1 || value === '1')
  @IsBoolean({ message: TrainingError.SpecialBoolean })
  @IsOptional()
  readonly isSpecial: boolean;
}
