import { AxiosResponse } from 'axios';
import { CreatedOrderType } from '../types/common';
import { IOrder } from '@fit-friends/shared';
import api from './api';

export const orderApi = {
  createOrder: (id: string, order: CreatedOrderType): Promise<AxiosResponse<IOrder>> => {
    return api.post<IOrder>(`/orders/${id}`, order);
  },

};
