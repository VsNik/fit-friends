import { IBalance } from './balance.interface';

export interface IBalanceCollection {
  data: IBalance[];
  page: number;
  total: number;
}
