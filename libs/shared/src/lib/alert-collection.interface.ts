import { IAlert } from './alert.interface';

export interface IAlertCollection {
  data: IAlert[];
  page: number;
  total: number;
}
