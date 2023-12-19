import { createSlice } from '@reduxjs/toolkit';
import { BalancState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { dismissionAction, fetchBalanceAction, setActiveAction, setNoActiveAction } from './async-action';

const initialState: BalancState = {
  balanc: null,
  loadStatus: LoadStatus.Never,
};

export const balanceSlice = createSlice({
  name: SliceName.Balance,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchBalanceAction.fulfilled, (state, { payload }) => {
        state.balanc = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchBalanceAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(dismissionAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(dismissionAction.fulfilled, (state, {payload}) => {
        state.balanc = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(dismissionAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(setActiveAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(setActiveAction.fulfilled, (state, {payload}) => {
        state.balanc = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(setActiveAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(setNoActiveAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(setNoActiveAction.fulfilled, (state, {payload}) => {
        state.balanc = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(setNoActiveAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});
