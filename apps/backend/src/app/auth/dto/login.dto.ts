import { UserError } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'ivan@app.test'
  })
  @IsEmail({}, { message: UserError.EmailIncorrect })
  @IsNotEmpty({ message: UserError.EmailRequired })
  readonly email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password'
  })
  @IsString({ message: UserError.PasswordString })
  @IsNotEmpty({ message: UserError.PasswordRequired })
  readonly password: string;
}
