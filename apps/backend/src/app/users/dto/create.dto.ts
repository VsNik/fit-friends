import { Gender, Role, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  avatar?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsOptional()
  birthDay?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsEnum(Location)
  @IsNotEmpty()
  location: Location;

  @IsString()
  @IsNotEmpty()
  bgImage: string;

  @IsEnum(TrainingLevel)
  @IsNotEmpty()
  trainingLevel: TrainingLevel;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(TrainingType, { each: true })
  trainingType: TrainingType[];
}
