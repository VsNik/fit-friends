import { ITraining } from './training.interface';

export interface ITrainingCollection {
  data: ITraining[];
  page: number;
  total: number;
}
