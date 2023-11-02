import { Gender, Role, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import {
  BIO_IS_STRING,
  BIO_LENGTH,
  BIRTHDAY_IS_STRING,
  EMAIL_NOT_EMPTY,
  GENDER_NOT_EMPTY,
  GENDER_VALUES,
  INVALID_EMAIL,
  LEVEL_NOT_EMPTY,
  LEVEL_VALUES,
  LOCATION_NOT_EMPTY,
  LOCATION_VALUES,
  NAME_IS_STRING,
  NAME_NOT_EMPTY,
  PASSWORD_IS_STRING,
  PASSWORD_LENGTH,
  PASSWORD_NOT_EMPTY,
  ROLE_NOT_EMPTY,
  ROLE_VALUES,
  TRAININGTYPE_NOT_EMPTY,
  TRAININGTYPE_VALUES,
  USER_NAME_LENGTH,
  UserValidate,
} from '@fit-friends/libs/validation';
import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString({ message: NAME_IS_STRING })
  @Length(UserValidate.NameMinLength, UserValidate.NameMaxLength, { message: USER_NAME_LENGTH })
  @IsNotEmpty({ message: NAME_NOT_EMPTY })
  readonly name: string;

  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty({ message: EMAIL_NOT_EMPTY })
  readonly email: string;

  @IsOptional()
  readonly avatar?: string;

  @IsString({ message: PASSWORD_IS_STRING })
  @Length(UserValidate.PasswordMinLength, UserValidate.PasswordMaxLength, { message: PASSWORD_LENGTH })
  @IsNotEmpty({ message: PASSWORD_NOT_EMPTY })
  readonly password: string;

  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsNotEmpty({ message: GENDER_NOT_EMPTY })
  readonly gender: Gender;

  @IsString({ message: BIRTHDAY_IS_STRING })
  @IsOptional()
  readonly birthDay?: string;

  @IsEnum(Role, { message: ROLE_VALUES })
  @IsNotEmpty({ message: ROLE_NOT_EMPTY })
  readonly role: Role;

  @IsString({ message: BIO_IS_STRING })
  @Length(UserValidate.BioMinLength, UserValidate.BioMaxLength, { message: BIO_LENGTH })
  @IsOptional()
  readonly bio?: string;

  @IsEnum(Location, { message: LOCATION_VALUES })
  @IsNotEmpty({ message: LOCATION_NOT_EMPTY })
  readonly location: Location;

  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsNotEmpty({ message: LEVEL_NOT_EMPTY })
  readonly trainingLevel: TrainingLevel;

  @IsArray()
  @ArrayNotEmpty({ message: TRAININGTYPE_NOT_EMPTY })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  readonly trainingType: TrainingType[];
}
