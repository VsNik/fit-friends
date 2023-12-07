import { createSlice } from '@reduxjs/toolkit';
import { BalancesState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { fetchPurchasesAction } from './async-actions';

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
        .addCase(fetchPurchasesAction.fulfilled, (state, {payload}) => {
            state.balances = payload.data;
            state.loadStatus = LoadStatus.Loaded;
        })
  }
});
