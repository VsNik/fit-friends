import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateDto } from './create.dto';
import { TrainingDuration } from '@fit-friends/libs/types';
import { Type } from 'class-transformer';

export class CreateUserDto extends CreateDto {
  @IsEnum(TrainingDuration)
  @IsNotEmpty()
  readonly trainingDuration: TrainingDuration;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly loseCalories: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly burnCalories: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  readonly ready: boolean;
}
