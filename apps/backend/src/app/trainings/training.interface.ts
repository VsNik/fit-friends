import { Gender, TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/libs/types';
import { IUser } from '../users/user.interface';

export interface ITraining {
  id: string;
  title: string;
  bgImage: string;
  level: TrainingLevel;
  type: TrainingType;
  duration: TrainingDuration;
  price: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  rating: number;
  coach: IUser;
  isSpecial: boolean;
  createdAt: string;
}
