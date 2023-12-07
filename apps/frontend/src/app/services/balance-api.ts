import { IBalanceCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import api from './api';

export const balanceApi = {
  fetchPurchases: (): Promise<AxiosResponse<IBalanceCollection>> => {
    return api.get<IBalanceCollection>('/balance');
  },
};
