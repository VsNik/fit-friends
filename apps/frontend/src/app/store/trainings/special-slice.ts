import { createSlice } from '@reduxjs/toolkit';
import { fetchSpecialAction } from './async-actions';
import { TrainingsState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';

const initialState: TrainingsState = {
  trainings: [],
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
  loadStatus: LoadStatus.Never,
  error: null,
};

export const specialSlice = createSlice({
  name: SliceName.Special,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchSpecialAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchSpecialAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
