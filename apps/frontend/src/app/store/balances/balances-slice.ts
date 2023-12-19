import { createSlice } from '@reduxjs/toolkit';
import { BalancesState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';
import { fetchPurchasesAction, loadMorePurchasesAction } from './async-actions';
import { BalanceFiter } from '@fit-friends/shared';

const initialState: BalancesState = {
  balances: [],
  filter: BalanceFiter.All,
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
  loadStatus: LoadStatus.Never,
};

export const balancesSlice = createSlice({
  name: SliceName.Balances,
  initialState,
  reducers: {
    setBalanceFilterAction: (state, action) => {
      state.filter = action.payload;
    }
  },
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
      .addCase(fetchPurchasesAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(loadMorePurchasesAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(loadMorePurchasesAction.fulfilled, (state, {payload}) => {
        state.balances = [...state.balances, ...payload.data];
        state.page = payload.page;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(loadMorePurchasesAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});

export const {setBalanceFilterAction} = balancesSlice.actions;