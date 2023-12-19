import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserValidate, UserError, MERTIS_LENGTH, LEVEL_VALUES, TrainingError, TRAININGTYPE_MAX_SIZE, TRAININGTYPE_VALUES } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { TrainingLevel, TrainingType } from '@fit-friends/shared';

export class CreateCoachDto {
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
  @IsString({ message: UserError.MeritsString })
  @Length(UserValidate.MeritsMinLength, UserValidate.MeritsMaxLength, { message: MERTIS_LENGTH })
  @IsOptional()
  readonly merits: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Личные тренировки',
    example: true,
  })
  @Transform(({value}) => value && value === 'true' || value === true || value === 1 || value === '1')
  @IsBoolean({ message: UserError.PersonalBoolean })
  @IsNotEmpty({ message: UserError.PersonalRequired })
  readonly personalTraining: boolean;
}
