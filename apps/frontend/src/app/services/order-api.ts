import { AxiosResponse } from 'axios';
import { CreatedOrderType } from '../types/common';
import { IOrder } from '@fit-friends/shared';
import api from './api';
import { generatePath } from 'react-router-dom';
import { ApiRoute } from '../constants/route';

export const orderApi = {
  createOrder: (id: string, order: CreatedOrderType): Promise<AxiosResponse<IOrder>> => {
    return api.post<IOrder>(generatePath(ApiRoute.Orders, {id}), order);
  },
};
