import { EMAIL_NOT_EMPTY, INVALID_EMAIL, PASSWORD_IS_STRING, PASSWORD_NOT_EMPTY } from '@fit-friends/libs/validation';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: INVALID_EMAIL })
  @IsNotEmpty({ message: EMAIL_NOT_EMPTY })
  readonly email: string;

  @IsString({ message: PASSWORD_IS_STRING })
  @IsNotEmpty({ message: PASSWORD_NOT_EMPTY })
  readonly password: string;
}
