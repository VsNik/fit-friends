import { Gender, Role, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
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
  TRAININGTYPE_MAX_SIZE,
  TRAININGTYPE_NOT_EMPTY,
  TRAININGTYPE_VALUES,
  TRAINING_TYPE_NOT_EMPTY,
  USER_NAME_LENGTH,
  UserValidate,
} from '@fit-friends/libs/validation';

export class CreateDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Ivanov Ivan',
  })
  @IsString({ message: NAME_IS_STRING })
  @Length(UserValidate.NameMinLength, UserValidate.NameMaxLength, { message: USER_NAME_LENGTH })
  @IsNotEmpty({ message: NAME_NOT_EMPTY })
  readonly name: string;

  @ApiProperty({
    description: 'Email адрес',
    example: 'ivan@app.test',
  })
  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty({ message: EMAIL_NOT_EMPTY })
  readonly email: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Аватар пользователя',
  })
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password',
  })
  @IsString({ message: PASSWORD_IS_STRING })
  @Length(UserValidate.PasswordMinLength, UserValidate.PasswordMaxLength, { message: PASSWORD_LENGTH })
  @IsNotEmpty({ message: PASSWORD_NOT_EMPTY })
  readonly password: string;

  @ApiProperty({
    enum: Gender,
    description: 'Пол пользователя',
    example: 'male',
  })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsNotEmpty({ message: GENDER_NOT_EMPTY })
  readonly gender: Gender;

  @ApiProperty({
    description: 'Дата рождения',
    example: '01.01.1991',
    required: false,
  })
  @IsString({ message: BIRTHDAY_IS_STRING })
  @IsOptional()
  readonly birthDay?: string;

  @ApiProperty({
    enum: Role,
    description: 'Роль',
    example: Role.User,
  })
  @IsEnum(Role, { message: ROLE_VALUES })
  @IsNotEmpty({ message: ROLE_NOT_EMPTY })
  readonly role: Role;

  @ApiProperty({
    type: 'text',
    description: 'Описание пользователя',
    example: 'some text description',
    required: false,
  })
  @IsString({ message: BIO_IS_STRING })
  @Length(UserValidate.BioMinLength, UserValidate.BioMaxLength, { message: BIO_LENGTH })
  @IsOptional()
  readonly bio?: string;

  @ApiProperty({
    enum: Location,
    description: 'Локация',
    example: Location.Pionerskaya,
  })
  @IsEnum(Location, { message: LOCATION_VALUES })
  @IsNotEmpty({ message: LOCATION_NOT_EMPTY })
  readonly location: Location;

  @ApiProperty({
    enum: TrainingLevel,
    description: 'Уровень подготовки',
    example: 'professional',
  })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsNotEmpty({ message: LEVEL_NOT_EMPTY })
  readonly trainingLevel: TrainingLevel;

  @ApiProperty({
    type: 'array',
    description: 'Тип тренировок',
    example: [TrainingType.Crossfit, TrainingType.Boxing],
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsArray()
  @ArrayNotEmpty({ message: TRAININGTYPE_NOT_EMPTY })
  @ArrayMaxSize(UserValidate.TrainingTypeMaxCount, { message: TRAININGTYPE_MAX_SIZE })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsNotEmpty({ message: TRAINING_TYPE_NOT_EMPTY })
  readonly trainingType: TrainingType[];
}
