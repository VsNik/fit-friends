import { createSlice } from '@reduxjs/toolkit';
import { fetchSpecialAction } from './async-actions';
import { TrainingsState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  loadStatus: LoadStatus.Never,
  error: '',
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
