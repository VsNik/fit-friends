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

export class UpdateTrainingDto {
  @IsString({ message: TRAINING_TITLE_IS_STRING })
  @Length(TrainingValidate.TitleMinLength, TrainingValidate.TitleMaxLength, { message: TRAINING_TITLE_LENGTH })
  @IsOptional()
  readonly title: string;

  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsOptional()
  readonly level: TrainingLevel;

  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsOptional()
  readonly type: TrainingType;

  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsOptional()
  readonly duration: TrainingDuration;

  @Type(() => Number)
  @IsNumber({ allowInfinity: true, allowNaN: true }, { message: PRICE_IS_NUMBER })
  @IsPositive({ message: PRICE_IS_NUMBER })
  @IsOptional()
  readonly price: number;

  @Type(() => Number)
  @IsNumber({}, { message: LOSE_CALORY_IS_NUMBER })
  @Min(TrainingValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(TrainingValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsOptional()
  readonly calories: number;

  @IsString({ message: TRAINING_DESCRIPTION_IS_STRING })
  @Length(TrainingValidate.DescriptionMinLength, TrainingValidate.DescriptionMaxLength, { message: TRAINING_DESCRIPTION_LENGTH })
  @IsOptional()
  readonly description: string;

  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsOptional()
  readonly gender: Gender;

  @IsOptional()
  readonly video: string;

  @Type(() => Boolean)
  @IsBoolean({ message: SPECIAL_IS_BOOLEAN })
  @IsOptional()
  readonly isSpecial: boolean;
}
