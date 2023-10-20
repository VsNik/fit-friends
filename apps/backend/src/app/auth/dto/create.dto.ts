import { Gender, Role, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  readonly avatar?: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: Gender;

  @IsString()
  @IsOptional()
  readonly birthDay?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;

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
}
