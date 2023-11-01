import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { Expose } from 'class-transformer';
import { UserRdo } from '../users/user.rdo';

export class TrainingRdo {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  bgImage: string;

  @Expose()
  level: TrainingLevel;

  @Expose()
  type: TrainingType;

  @Expose()
  duration: TrainingDuration;

  @Expose()
  price: number;

  @Expose()
  calories: number;

  @Expose()
  description: string;

  @Expose()
  gender: Gender;

  @Expose()
  video: string;

  @Expose()
  rating: number;

  @Expose()
  coach: UserRdo;

  @Expose()
  isSpecial: boolean;

  @Expose()
  createdAt: string;
}
