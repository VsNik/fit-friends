import { IBalance, IBalanceCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import api from './api';

export const balanceApi = {
  fetchPurchases: (queryString: string): Promise<AxiosResponse<IBalanceCollection>> => {
    return api.get<IBalanceCollection>(`/balance${queryString}`);
  },

  fetchBalance: (id: string): Promise<AxiosResponse<IBalance>> => {
    return api.get<IBalance>(`/balance/${id}`);
  },

  admissionBalance: (id: string, count: number): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(`/balance/${id}/admission`, {count});
  },

  dismissionBalance: (id: string, count: number): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(`/balance/${id}/dismission`, {count});
  },
};
