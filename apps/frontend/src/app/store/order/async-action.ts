import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatedOrderType } from '../../types/common';
import { orderApi } from '../../services/order-api';
import { IOrder } from '@fit-friends/shared';

export const createOrderAction = createAsyncThunk<IOrder, {id: string, order: CreatedOrderType}>(
  'order/create', 
  async ({id, order}) => {
    const {data} = await orderApi.createOrder(id, order);
    return data;
});
