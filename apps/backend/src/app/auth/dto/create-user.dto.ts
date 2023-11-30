import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { CreateDto } from './create.dto';
import { TrainingDuration } from '@fit-friends/shared';
import { Transform, Type } from 'class-transformer';
import {
  BURN_CALORY_MAX,
  BURN_CALORY_MIN,
  DURATION_VALUES,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  UserError,
  UserValidate,
} from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends CreateDto {
  @ApiProperty({
    enum: TrainingDuration,
    description: 'Время на тренировку',
    example: TrainingDuration.Normal,
  })
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsNotEmpty({ message: UserError.DurationRequired })
  readonly trainingTime: TrainingDuration;

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
