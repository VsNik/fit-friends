import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateDto } from './create.dto';
import { TrainingDuration } from '@fit-friends/libs/types';

export class CreateUserDto extends CreateDto {
  @IsEnum(TrainingDuration)
  @IsNotEmpty()
  trainingDuration: TrainingDuration;

  @IsNumber()
  @IsNotEmpty()
  loseCalories: number;

  @IsNumber()
  @IsNotEmpty()
  burnCalories: number;

  @IsBoolean()
  @IsNotEmpty()
  ready: boolean;
}
