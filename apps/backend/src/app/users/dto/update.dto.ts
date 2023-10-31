import { Gender, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly avatar?: string;

  @IsEnum(Gender)
  @IsOptional()
  readonly gender?: Gender;

  @IsString()
  @IsOptional()
  readonly birthDay?: string;

  @IsString()
  @IsOptional()
  readonly bio?: string;

  @IsEnum(Location)
  @IsOptional()
  readonly location?: Location;

  @IsString()
  @IsOptional()
  readonly bgImage?: string;

  @IsEnum(TrainingLevel)
  @IsOptional()
  readonly trainingLevel?: TrainingLevel;

  @IsArray()
  @IsEnum(TrainingType, { each: true })
  @IsOptional()
  readonly trainingType?: TrainingType[];

  @IsEnum(TrainingDuration)
  @IsOptional()
  readonly trainingTime?: TrainingDuration;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly loseCalories?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  readonly burnCalories?: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  readonly ready?: boolean;

  @IsOptional()
  readonly certificate?: string;

  @IsString()
  @IsOptional()
  readonly merits?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  readonly personalTraining?: boolean;
}
