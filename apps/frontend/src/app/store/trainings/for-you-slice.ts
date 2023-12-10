import { createSlice } from '@reduxjs/toolkit';
import { fetchForYouAction } from './async-actions';
import { TrainingsState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';

const initialState: TrainingsState = {
  trainings: [],
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
  loadStatus: LoadStatus.Never,
  error: null,
};

export const forYouSlice = createSlice({
  name: SliceName.ForYou,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForYouAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchForYouAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchForYouAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
