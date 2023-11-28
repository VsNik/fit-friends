import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatedOrderType } from '../../types/common';
import { orderApi } from '../../services/order-api';

export const createOrderAction = createAsyncThunk<CreatedOrderType, CreatedOrderType>('order/create', async (order) => {
  const data = await orderApi.createOrder(order);
  return data;
});
