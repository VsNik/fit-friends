import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CertificateDto {
  @ApiProperty({example: 'http://localhost:5000/static/certificate.pdf'})
  @IsString()
  @IsNotEmpty()
  src: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Сертификат тренера',
  })
  @IsOptional()
  certificate: string;
}
