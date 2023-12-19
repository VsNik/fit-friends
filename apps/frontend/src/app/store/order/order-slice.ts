import { createSlice } from '@reduxjs/toolkit';
import { OrderState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { createOrderAction } from './async-action';
import { IOrder } from '@fit-friends/shared';

const initialState: OrderState = {
  order: {} as IOrder,
  loadStatus: LoadStatus.Never,
};

export const orderSlice = createSlice({
  name: SliceName.Order,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(createOrderAction.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(createOrderAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
