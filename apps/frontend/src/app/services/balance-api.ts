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

  dismissionBalance: (id: string, count: number): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(`/balance/${id}/dismission`, {count});
  },

  setActive: (id: string): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(`/balance/${id}/active`);
  },

  setNoActive: (id: string): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(`/balance/${id}/no-active`);
  }
};
