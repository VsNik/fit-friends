import { Gender, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCoachDto {
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

  @IsString()
  @IsNotEmpty()
  readonly certificate: string;

  @IsString()
  @IsNotEmpty()
  readonly merits: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly personalTraining: boolean;
}
