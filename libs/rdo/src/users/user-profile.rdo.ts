import { TrainingDuration } from '@fit-friends/libs/types';
import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class UserProfileRdo extends UserRdo {
  @Expose()
  trainingDuration?: TrainingDuration;

  @Expose()
  loseCalories?: number;

  @Expose()
  burnCalories?: number;

  @Expose()
  ready?: boolean;
}
