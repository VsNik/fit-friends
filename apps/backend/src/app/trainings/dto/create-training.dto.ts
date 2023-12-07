import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
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

export class CreateTrainingDto {
  @ApiProperty({
    description: 'Название тренировки',
    example: 'Some training',
  })
  @IsString({ message: TrainingError.TitleString })
  @Length(TrainingValidate.TitleMinLength, TrainingValidate.TitleMaxLength, { message: TRAINING_TITLE_LENGTH })
  @IsNotEmpty({ message: TrainingError.TitleRequired })
  readonly title: string;

  @ApiProperty({
    enum: TrainingLevel,
    description: 'Уровень подготовки',
    example: 'professional',
  })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsNotEmpty({ message: UserError.LevelRequired })
  readonly level: TrainingLevel;

  @ApiProperty({
    enum: TrainingType,
    description: 'Тип тренировки',
    example: TrainingType.Boxing,
  })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsNotEmpty({ message: TrainingError.TypeRequired })
  readonly type: TrainingType;

  @ApiProperty({
    enum: TrainingDuration,
    description: 'Продолжительность',
    example: TrainingDuration.Normal,
  })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsNotEmpty({ message: UserError.DurationRequired })
  readonly duration: TrainingDuration;

  @ApiProperty({
    description: 'Цена тренировки',
    example: 5000,
  })
  @Type(() => Number)
  @IsNumber({ allowInfinity: true, allowNaN: true }, { message: TrainingError.PriceNumber })
  @Min(TrainingValidate.PriceMin, {message: TrainingError.PriceNumber})
  @Max(TrainingValidate.PriceMax, {message: TrainingError.PriceNumber})
  @IsNotEmpty({ message: TrainingError.PriceRequired })
  readonly price: number;

  @ApiProperty({
    description: 'Количество калорий',
    example: 3000,
  })
  @Type(() => Number)
  @IsNumber({}, { message: UserError.LoseCaloryNumber })
  @Min(TrainingValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(TrainingValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsNotEmpty({ message: UserError.LoseCaloryRequired })
  readonly calories: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Some decription text',
  })
  @IsString({ message: TrainingError.DescString })
  @Length(TrainingValidate.DescriptionMinLength, TrainingValidate.DescriptionMaxLength, { message: TRAINING_DESCRIPTION_LENGTH })
  @IsNotEmpty({ message: TrainingError.DescRequired })
  readonly description: string;

  @ApiProperty({
    enum: Gender,
    description: 'Пол пользователя',
    example: Gender.Male,
  })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsNotEmpty({ message: UserError.GenderRequired })
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
  @IsBoolean({ message: TrainingError.SpecialBoolean })
  @IsNotEmpty({ message: TrainingError.SpecialRequired })
  readonly isSpecial: boolean;
}
