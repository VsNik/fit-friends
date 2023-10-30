import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  SERVER_HOST: string;

  @IsString()
  @IsNotEmpty()
  STATIC_DIR: string;

  @IsString()
  @IsNotEmpty()
  UPLOAD_DIR: string;

  @IsString()
  @IsNotEmpty()
  SERVE_ROOT: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_EXPIRE: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_EXPIRE: string;

  @IsString()
  @IsNotEmpty()
  MAIL_SMTP_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  MAIL_SMTP_PORT: number;

  @IsString()
  @IsNotEmpty()
  MAIL_USER_NAME: string;

  @IsString()
  @IsNotEmpty()
  MAIL_USER_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MAIL_FROM: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
