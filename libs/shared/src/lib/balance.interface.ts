import { ITraining } from './training.interface';

export interface IBalance {
  id?: string;
  userId: string;
  training: ITraining;
  count: number;
  createdAt?: string;
  isActive?: boolean;
}
