import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BIO_LENGTH, GENDER_VALUES, LOCATION_VALUES, PASSWORD_LENGTH, ROLE_VALUES, USER_NAME_LENGTH, UserError, UserValidate } from '@fit-friends/libs/validation';
import { Gender, Role, Location } from '@fit-friends/shared';

export class SignupDto {
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
}
