import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { CreateDto } from './create.dto';
import { TrainingDuration } from '@fit-friends/libs/types';
import { Type } from 'class-transformer';
import {
  BURN_CALORY_IS_NUMBER,
  BURN_CALORY_MAX,
  BURN_CALORY_MIN,
  BURN_CALORY_NOT_EMPTY,
  DURATION_NOT_EMPTY,
  DURATION_VALUES,
  LOSE_CALORY_IS_NUMBER,
  LOSE_CALORY_MAX,
  LOSE_CALORY_MIN,
  LOSE_CALORY_NOT_EMPTY,
  READY_IS_BOOLEAN,
  READY_NOT_EMPTY,
  UserValidate,
} from '@fit-friends/libs/validation';

export class CreateUserDto extends CreateDto {
  @IsEnum(TrainingDuration, { message: DURATION_VALUES })
  @IsNotEmpty({ message: DURATION_NOT_EMPTY })
  readonly trainingTime: TrainingDuration;

  @Type(() => Number)
  @IsNumber({}, { message: LOSE_CALORY_IS_NUMBER })
  @Min(UserValidate.CaloryMin, { message: LOSE_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: LOSE_CALORY_MAX })
  @IsNotEmpty({ message: LOSE_CALORY_NOT_EMPTY })
  readonly loseCalories: number;

  @Type(() => Number)
  @IsNumber({}, { message: BURN_CALORY_IS_NUMBER })
  @Min(UserValidate.CaloryMin, { message: BURN_CALORY_MIN })
  @Max(UserValidate.CaloryMax, { message: BURN_CALORY_MAX })
  @IsNotEmpty({ message: BURN_CALORY_NOT_EMPTY })
  readonly burnCalories: number;

  @Type(() => Boolean)
  @IsBoolean({ message: READY_IS_BOOLEAN })
  @IsNotEmpty({ message: READY_NOT_EMPTY })
  readonly ready: boolean;
}
