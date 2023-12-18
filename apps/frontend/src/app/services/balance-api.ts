import { IBalance, IBalanceCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import api from './api';
import { ApiBalanceRoute } from '../constants/route';
import { generatePath } from 'react-router-dom';

export const balanceApi = {
  fetchPurchases: (queryString: string): Promise<AxiosResponse<IBalanceCollection>> => {
    return api.get<IBalanceCollection>(`${ApiBalanceRoute.All}${queryString}`);
  },

  fetchBalance: (id: string): Promise<AxiosResponse<IBalance>> => {
    return api.get<IBalance>(generatePath(ApiBalanceRoute.ShowBalance, {id}));
  },

  dismissionBalance: (id: string, count: number): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(generatePath(ApiBalanceRoute.Dismission, {id}), {count});
  },

  setActive: (id: string): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(generatePath(ApiBalanceRoute.SetActive, {id}));
  },

  setNoActive: (id: string): Promise<AxiosResponse<IBalance>> => {
    return api.patch<IBalance>(generatePath(ApiBalanceRoute.SetNoActive, {id}));
  }
};
