import { EMAIL_NOT_EMPTY, INVALID_EMAIL, PASSWORD_IS_STRING, PASSWORD_NOT_EMPTY } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'ivan@app.test'
  })
  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty({ message: EMAIL_NOT_EMPTY })
  readonly email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password'
  })
  @IsString({ message: PASSWORD_IS_STRING })
  @IsNotEmpty({ message: PASSWORD_NOT_EMPTY })
  readonly password: string;
}
