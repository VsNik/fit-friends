import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateDto } from './create.dto';
import { TrainingDuration } from '@fit-friends/libs/types';

export class CreateUserDto extends CreateDto {
  @IsEnum(TrainingDuration)
  @IsNotEmpty()
  readonly trainingDuration: TrainingDuration;

  @IsNumber()
  @IsNotEmpty()
  readonly loseCalories: number;

  @IsNumber()
  @IsNotEmpty()
  readonly burnCalories: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly ready: boolean;
}
