import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularAction } from './async-actions';
import { TrainingsState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';

const initialState: TrainingsState = {
  trainings: [],
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
  loadStatus: LoadStatus.Never,
  error: null,
};

export const popularSlice = createSlice({
  name: SliceName.Popular,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchPopularAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchPopularAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});
