import { ITraining } from '../trainings/training.interface';
import { IUser } from '../users/user.interface';

export interface IReview {
  id?: string;
  user: IUser;
  training: ITraining;
  rating: number;
  text: string;
  createdAt?: string;
}
