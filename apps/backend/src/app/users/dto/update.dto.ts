import { Gender, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/libs/types';
import {
  BIO_IS_STRING,
  BIO_LENGTH,
  BIRTHDAY_IS_STRING,
  BURN_CALORY_IS_NUMBER,
  BURN_CALORY_MAX,
  BURN_CALORY_MIN,
  DURATION_VALUES,
  GENDER_VALUES,
  LEVEL_VALUES,
  LOCATION_VALUES,
  LOSE_CALORY_IS_NUMBER,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  MERITS_IS_STRING,
  MERTIS_LENGTH,
  NAME_IS_STRING,
  PERSONAL_IS_BOOLEAN,
  READY_IS_BOOLEAN,
  TRAININGTYPE_MAX_SIZE,
  TRAININGTYPE_NOT_EMPTY,
  TRAININGTYPE_VALUES,
  USER_NAME_LENGTH,
  UserValidate,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Ivanov Ivan',
    required: false
  })
  @IsString({ message: NAME_IS_STRING })
  @Length(UserValidate.NameMinLength, UserValidate.NameMaxLength, { message: USER_NAME_LENGTH })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Аватар пользователя',
  })
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({
    enum: Gender,
    description: 'Пол пользователя',
    example: 'male',
    required: false
  })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsOptional()
  readonly gender?: Gender;

  @ApiProperty({
    description: 'Дата рождения',
    example: '01.01.1991',
    required: false,
  })
  @IsString({ message: BIRTHDAY_IS_STRING })
  @IsOptional()
  readonly birthDay?: string;

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
    required: false
  })
  @IsEnum(Location, { message: LOCATION_VALUES })
  @IsOptional()
  readonly location?: Location;

  @ApiProperty({
    enum: TrainingLevel,
    description: 'Уровень подготовки',
    example: 'professional',
    required: false
  })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsOptional()
  readonly trainingLevel?: TrainingLevel;

  @ApiProperty({
    type: 'array',
    description: 'Тип тренировок',
    example: [TrainingType.Crossfit, TrainingType.Boxing],
    required: false
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsArray()
  @ArrayNotEmpty({ message: TRAININGTYPE_NOT_EMPTY })
  @ArrayMaxSize(UserValidate.TrainingTypeMaxCount, { message: TRAININGTYPE_MAX_SIZE })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsOptional()
  readonly trainingType?: TrainingType[];

  @ApiProperty({
    enum: TrainingDuration,
    description: 'Время на тренировку',
    example: TrainingDuration.Normal,
    required: false
  })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsOptional()
  readonly trainingTime?: TrainingDuration;

  @ApiProperty({
    description: 'Количество калорий для сброса',
    example: 1000,
    required: false
  })
  @Type(() => Number)
  @IsInt()
  @IsNumber({}, { message: LOSE_CALORY_IS_NUMBER })
  @Min(UserValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsOptional()
  readonly loseCalories?: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день',
    example: 1000,
    required: false
  })
  @Type(() => Number)
  @IsInt()
  @IsNumber({}, { message: BURN_CALORY_IS_NUMBER })
  @Min(UserValidate.CaloryMin, { message: BURN_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: BURN_CALORY_MAX })
  @IsOptional()
  readonly burnCalories?: number;

  @ApiProperty({
    type: 'boolean',
    description: 'Готовность к тренировке',
    example: true,
    required: false
  })
  @Type(() => Boolean)
  @IsBoolean({ message: READY_IS_BOOLEAN })
  @IsOptional()
  readonly ready?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Сертификат тренера',    
  })
  @IsOptional()
  readonly certificate?: string;

  @ApiProperty({
    description: 'Заслуги тренера',
    required: false,
  })
  @IsString({ message: MERITS_IS_STRING })
  @Length(UserValidate.MeritsMinLength, UserValidate.MeritsMaxLength, { message: MERTIS_LENGTH })
  @IsOptional()
  readonly merits?: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Личные тренировки',
    example: true,
    required: false
  })
  @Type(() => Boolean)
  @IsBoolean({ message: PERSONAL_IS_BOOLEAN })
  @IsOptional()
  readonly personalTraining?: boolean;
}
