import { ITraining } from './training.interface';
import { IUser } from './user.interface';

export interface IReview {
  id?: string;
  user: IUser;
  training: ITraining;
  rating: number;
  text: string;
  createdAt?: string;
}
