import { Gender, TrainingDuration, TrainingLevel, TrainingType, Location } from '@fit-friends/shared';
import {
  UserError,
  TrainingError,
  UserValidate,
  USER_NAME_LENGTH,
  GENDER_VALUES,
  BIO_LENGTH,
  LOCATION_VALUES,
  LEVEL_VALUES,
  TRAININGTYPE_VALUES,
  TRAININGTYPE_MAX_SIZE,
  DURATION_VALUES,
  MERTIS_LENGTH,
  LOSE_CALORY_MIN,
  LOSE_CALORY_MAX,
  BURN_CALORY_MIN,
  BURN_CALORY_MAX,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'Ivanov Ivan', required: false })
  @IsString({ message: UserError.NameString })
  @Length(UserValidate.NameMinLength, UserValidate.NameMaxLength, { message: USER_NAME_LENGTH })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false, description: 'Аватар пользователя' })
  @IsOptional()
  readonly avatar?: string;

  @ApiProperty({ enum: Gender, description: 'Пол пользователя', example: 'male', required: false })
  @IsEnum(Gender, { message: GENDER_VALUES })
  @IsOptional()
  readonly gender?: Gender;

  @ApiProperty({ description: 'Дата рождения', example: '01.01.1991', required: false })
  @IsString({ message: UserError.BirtdayString })
  @IsOptional()
  readonly birthDay?: string;

  @ApiProperty({ type: 'text', description: 'Описание пользователя', example: 'some text description', required: false })
  @IsString({ message: UserError.BioString })
  @Length(UserValidate.BioMinLength, UserValidate.BioMaxLength, { message: BIO_LENGTH })
  @IsOptional()
  readonly bio?: string;

  @ApiProperty({ enum: Location, description: 'Локация', example: Location.Pionerskaya, required: false })
  @IsEnum(Location, { message: LOCATION_VALUES })
  @IsOptional()
  readonly location?: Location;

  @ApiProperty({ enum: TrainingLevel, description: 'Уровень подготовки', example: 'professional', required: false })
  @IsEnum(TrainingLevel, { message: LEVEL_VALUES })
  @IsOptional()
  readonly trainingLevel?: TrainingLevel;

  @ApiProperty({ type: 'array', description: 'Тип тренировок', example: [TrainingType.Crossfit, TrainingType.Boxing], required: false })
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsArray()
  @ArrayNotEmpty({ message: TrainingError.TypeRequired })
  @ArrayMaxSize(UserValidate.TrainingTypeMaxCount, { message: TRAININGTYPE_MAX_SIZE })
  @IsEnum(TrainingType, { each: true, message: TRAININGTYPE_VALUES })
  @IsOptional()
  readonly trainingType?: TrainingType[];

  @ApiProperty({ enum: TrainingDuration, description: 'Время на тренировку', example: TrainingDuration.Normal, required: false })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsOptional()
  readonly trainingTime?: TrainingDuration;

  @ApiProperty({ description: 'Количество калорий для сброса', example: 1000, required: false })
  @Type(() => Number)
  @IsInt()
  @IsNumber({}, { message: UserError.LoseCaloryNumber })
  @Min(UserValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsOptional()
  readonly loseCalories?: number;

  @ApiProperty({ description: 'Количество калорий для траты в день', example: 1000, required: false })
  @Type(() => Number)
  @IsInt()
  @IsNumber({}, { message: UserError.BurnCaloryNumber })
  @Min(UserValidate.CaloryMin, { message: BURN_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: BURN_CALORY_MAX })
  @IsOptional()
  readonly burnCalories?: number;

  @ApiProperty({ type: 'boolean', description: 'Готовность к тренировке', example: true, required: false })
  @Type(() => Boolean)
  @IsBoolean({ message: UserError.ReadyBoolean })
  @IsOptional()
  readonly ready?: boolean;

  @ApiProperty({ type: 'string', format: 'binary', required: false, description: 'Сертификат тренера' })
  @IsOptional()
  readonly certificate?: string[];

  @ApiProperty({ description: 'Заслуги тренера', required: false })
  @IsString({ message: UserError.MeritsString })
  @Length(UserValidate.MeritsMinLength, UserValidate.MeritsMaxLength, { message: MERTIS_LENGTH })
  @IsOptional()
  readonly merits?: string;

  @ApiProperty({ type: 'boolean', description: 'Личные тренировки', example: true, required: false })
  @Transform(({ value }) => (value && value === 'true') || value === true || value === 1 || value === '1')
  @IsBoolean({ message: UserError.PersonalBoolean })
  @IsOptional()
  readonly personalTraining?: boolean;
}
