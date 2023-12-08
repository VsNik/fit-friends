import { createSlice } from '@reduxjs/toolkit';
import { BalancesState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { fetchPurchasesAction, loadMorePurchasesAction } from './async-actions';

const initialState: BalancesState = {
  balances: [],
  page: 1,
  total: 0,
  loadStatus: LoadStatus.Never,
};

export const balancesSlice = createSlice({
  name: SliceName.Balances,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasesAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchPurchasesAction.fulfilled, (state, { payload }) => {
        state.balances = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(loadMorePurchasesAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(loadMorePurchasesAction.fulfilled, (state, {payload}) => {
        state.balances = [...state.balances, ...payload.data];
        state.page = payload.page;
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
