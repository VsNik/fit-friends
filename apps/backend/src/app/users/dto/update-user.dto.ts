import { Gender, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly avatar?: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: Gender;

  @IsString()
  @IsOptional()
  readonly birthDay?: string;

  @IsString()
  @IsOptional()
  readonly bio?: string;

  @IsEnum(Location)
  @IsNotEmpty()
  readonly location: Location;

  @IsString()
  @IsNotEmpty()
  readonly bgImage: string;

  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  readonly trainingLevel: TrainingLevel;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(TrainingType, { each: true })
  readonly trainingType: TrainingType[];

  @IsEnum(TrainingDuration)
  @IsNotEmpty()
  readonly trainingDuration: TrainingDuration;

  @IsNumber()
  @IsNotEmpty()
  readonly loseCalories: number;

  @IsNumber()
  @IsNotEmpty()
  readonly burnCalories: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly ready: boolean;
}