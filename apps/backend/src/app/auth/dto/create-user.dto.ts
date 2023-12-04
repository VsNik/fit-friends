import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { Transform, Type } from 'class-transformer';
import {
  BURN_CALORY_MAX,
  BURN_CALORY_MIN,
  DURATION_VALUES,
  LEVEL_VALUES,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  TRAININGTYPE_MAX_SIZE,
  TRAININGTYPE_VALUES,
  TrainingError,
  UserError,
  UserValidate,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    enum: TrainingDuration,
    description: 'Время на тренировку',
    example: TrainingDuration.Normal,
  })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsNotEmpty({ message: UserError.DurationRequired })
  readonly trainingDuration: TrainingDuration;

  @ApiProperty({
    description: 'Количество калорий для сброса',
    example: 1000,
  })
  @Type(() => Number)
  @IsInt()
  @IsNumber({}, { message: UserError.LoseCaloryNumber })
  @Min(UserValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsNotEmpty({ message: UserError.LoseCaloryRequired })
  readonly loseCalories: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день',
    example: 1000,
  })
  @Type(() => Number)
  @IsInt()
  @IsNumber({}, { message: UserError.BurnCaloryNumber })
  @Min(UserValidate.CaloryMin, { message: BURN_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: BURN_CALORY_MAX })
  @IsNotEmpty({ message: UserError.BurnCaloryRequired })
  readonly burnCalories: number;

  @ApiProperty({
    type: 'boolean',
    description: 'Готовность к тренировке',
    example: true,
  })
  @Transform(({ value }) => (value && value === 'true') || value === true || value === 1 || value === '1')
  @IsBoolean({ message: UserError.ReadyBoolean })
  @IsNotEmpty({ message: UserError.ReadyRequired })
  readonly ready: boolean;
}
