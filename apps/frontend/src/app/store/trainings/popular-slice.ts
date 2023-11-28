import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularAction } from './async-actions';
import { TrainingsState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  loadStatus: LoadStatus.Never,
  error: '',
};

export const popularSlice = createSlice({
  name: SliceName.Popular,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = '';
      })
      .addCase(fetchPopularAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
