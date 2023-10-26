import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTrainingDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  readonly level: TrainingLevel;

  @IsEnum(TrainingType)
  @IsNotEmpty()
  readonly type: TrainingType;

  @IsEnum(TrainingDuration)
  @IsNotEmpty()
  readonly duration: TrainingDuration;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly calories: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: Gender;

  @IsString()
  @IsOptional()
  readonly video: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  readonly isSpecial: boolean;
}
