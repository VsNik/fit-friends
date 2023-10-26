import { ITraining } from '../trainings/training.interface';

export interface IBalance {
  id?: string;
  userId: string;
  training: ITraining;
  count: number;
  createdAt?: string;
}
