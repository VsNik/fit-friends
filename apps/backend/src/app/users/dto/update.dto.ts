import { Gender, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import {
  BIO_IS_STRING,
  BIO_LENGTH,
  BIRTHDAY_IS_STRING,
  BURN_CALORY_IS_NUMBER,
  BURN_CALORY_MAX,
  BURN_CALORY_MIN,
  DURATION_VALUES,
  GENDER_VALUES,
  LEVEL_VALUES,
  LOCATION_VALUES,
  LOSE_CALORY_IS_NUMBER,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  MERITS_IS_STRING,
  MERTIS_LENGTH,
  NAME_IS_STRING,
  PERSONAL_IS_BOOLEAN,
  READY_IS_BOOLEAN,
  TRAININGTYPE_VALUES,
  USER_NAME_LENGTH,
  UserValidate,
} from '@fit-friends/libs/validation';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateDto {
  @IsString({ message: NAME_IS_STRING })
  @Length(UserValidate.NameMinLength, UserValidate.NameMaxLength, { message: USER_NAME_LENGTH })
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly avatar?: string;

  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsOptional()
  readonly gender?: Gender;

  @IsString({ message: BIRTHDAY_IS_STRING })
  @IsOptional()
  readonly birthDay?: string;

  @IsString({ message: BIO_IS_STRING })
  @Length(UserValidate.BioMinLength, UserValidate.BioMaxLength, { message: BIO_LENGTH })
  @IsOptional()
  readonly bio?: string;

  @IsEnum(Location, { message: LOCATION_VALUES })
  @IsOptional()
  readonly location?: Location;

  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsOptional()
  readonly trainingLevel?: TrainingLevel;

  @IsArray()
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsOptional()
  readonly trainingType?: TrainingType[];

  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsOptional()
  readonly trainingTime?: TrainingDuration;

  @Type(() => Number)
  @IsNumber({}, { message: LOSE_CALORY_IS_NUMBER })
  @Min(UserValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsOptional()
  readonly loseCalories?: number;

  @Type(() => Number)
  @IsNumber({}, { message: BURN_CALORY_IS_NUMBER })
  @Min(UserValidate.CaloryMin, { message: BURN_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: BURN_CALORY_MAX })
  @IsOptional()
  readonly burnCalories?: number;

  @Type(() => Boolean)
  @IsBoolean({ message: READY_IS_BOOLEAN })
  @IsOptional()
  readonly ready?: boolean;

  @IsOptional()
  readonly certificate?: string;

  @IsString({ message: MERITS_IS_STRING })
  @Length(UserValidate.MeritsMinLength, UserValidate.MeritsMaxLength, { message: MERTIS_LENGTH })
  @IsOptional()
  readonly merits?: string;

  @Type(() => Boolean)
  @IsBoolean({ message: PERSONAL_IS_BOOLEAN })
  @IsOptional()
  readonly personalTraining?: boolean;
}
