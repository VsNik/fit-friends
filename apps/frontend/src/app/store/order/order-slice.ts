import { createSlice } from '@reduxjs/toolkit';
import { OrderState } from '../../types/state-type';
import { CreatedOrderType } from '../../types/common';
import { SliceName } from '../../constants/common';
import { createOrderAction } from './async-action';

const initialState: OrderState = {
  order: {} as CreatedOrderType,
  isLoading: false,
};

export const orderSlice = createSlice({
  name: SliceName.Order,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderAction.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.isLoading = false;
      });
  },
});

