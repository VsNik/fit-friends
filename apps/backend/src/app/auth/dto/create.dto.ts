import { Gender, Role, TrainingLevel, TrainingType, Location } from '@fit-friends/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import {
  UserError,
  TrainingError,
  UserValidate,
  USER_NAME_LENGTH,
  PASSWORD_LENGTH,
  GENDER_VALUES,
  ROLE_VALUES,
  BIO_LENGTH,
  LOCATION_VALUES,
  LEVEL_VALUES,
  TRAININGTYPE_VALUES,
  TRAININGTYPE_MAX_SIZE,
} from '@fit-friends/libs/validation';

export class CreateDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Ivanov Ivan',
  })
  @IsString({ message: UserError.NameString })
  @Length(UserValidate.NameMinLength, UserValidate.NameMaxLength, { message: USER_NAME_LENGTH })
  @IsNotEmpty({ message: UserError.NameRequired })
  readonly name: string;

  @ApiProperty({
    description: 'Email адрес',
    example: 'ivan@app.test',
  })
  @IsEmail({}, { message: UserError.EmailIncorrect })
  @IsNotEmpty({ message: UserError.EmailRequired })
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
  @IsString({ message: UserError.PasswordString })
  @Length(UserValidate.PasswordMinLength, UserValidate.PasswordMaxLength, { message: PASSWORD_LENGTH })
  @IsNotEmpty({ message: UserError.PasswordRequired })
  readonly password: string;

  @ApiProperty({
    enum: Gender,
    description: 'Пол пользователя',
    example: 'male',
  })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsNotEmpty({ message: UserError.GenderRequired })
  readonly gender: Gender;

  @ApiProperty({
    description: 'Дата рождения',
    example: '01.01.1991',
    required: false,
  })
  @IsString({ message: UserError.BirtdayString })
  @IsOptional()
  readonly birthDay?: string;

  @ApiProperty({
    enum: Role,
    description: 'Роль',
    example: Role.User,
  })
  @IsEnum(Role, { message: ROLE_VALUES })
  @IsNotEmpty({ message: UserError.RoleRequired })
  readonly role: Role;

  @ApiProperty({
    type: 'text',
    description: 'Описание пользователя',
    example: 'some text description',
    required: false,
  })
  @IsString({ message: UserError.BioString })
  @Length(UserValidate.BioMinLength, UserValidate.BioMaxLength, { message: BIO_LENGTH })
  @IsOptional()
  readonly bio?: string;

  @ApiProperty({
    enum: Location,
    description: 'Локация',
    example: Location.Pionerskaya,
  })
  @IsEnum(Location, { message: LOCATION_VALUES })
  @IsNotEmpty({ message: UserError.LocationRequired })
  readonly location: Location;

  @ApiProperty({
    enum: TrainingLevel,
    description: 'Уровень подготовки',
    example: 'professional',
  })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsNotEmpty({ message: UserError.LevelRequired })
  readonly trainingLevel: TrainingLevel;

  @ApiProperty({
    type: 'array',
    description: 'Тип тренировок',
    example: [TrainingType.Crossfit, TrainingType.Boxing],
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsArray()
  @ArrayNotEmpty({ message: TrainingError.TypeRequired })
  @ArrayMaxSize(UserValidate.TrainingTypeMaxCount, { message: TRAININGTYPE_MAX_SIZE })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsNotEmpty({ message: TrainingError.TypeRequired })
  readonly trainingType: TrainingType[];
}
