import { Expose } from 'class-transformer';
import { UserRdo } from '../users/user.rdo';
import { TrainingRdo } from '../trainings/training.rdo';

export class ReviewRdo {
  @Expose()
  readonly id: string;

  @Expose()
  readonly user: UserRdo;

  @Expose()
  readonly training: TrainingRdo;

  @Expose()
  readonly rating: number;

  @Expose()
  readonly text: string;

  @Expose()
  readonly createdAt: string;
}
