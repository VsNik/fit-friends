import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { CreateDto } from './create.dto';
import { Type } from 'class-transformer';
import { MERITS_IS_STRING, MERTIS_LENGTH, PERSONAL_IS_BOOLEAN, PERSONAL_NOT_EMPTY, UserValidate } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoachDto extends CreateDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'Сертификат тренера',    
  })
  @IsOptional()
  readonly certificate: string;

  @ApiProperty({
    description: 'Заслуги тренера',
    required: false,
  })
  @IsString({ message: MERITS_IS_STRING })
  @Length(UserValidate.MeritsMinLength, UserValidate.MeritsMaxLength, { message: MERTIS_LENGTH })
  @IsOptional()
  readonly merits: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Личные тренировки',
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean({ message: PERSONAL_IS_BOOLEAN })
  @IsNotEmpty({ message: PERSONAL_NOT_EMPTY })
  readonly personalTraining: boolean;
}
