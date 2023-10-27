import { ITraining } from '../trainings/training.interface';

export interface INotify {
  id?: string;
  coachId: string;
  subscribeEmails: string[];
  training: ITraining;
  createdAt?: string;
}
