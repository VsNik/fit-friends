import { createSlice } from '@reduxjs/toolkit';
import { TrainingState } from '../../types/state-type';
import { ITraining } from '@fit-friends/shared';
import { LoadStatus, SliceName } from '../../constants/common';
import { createTrainingAction, fetchTrainingAction, removeVideoAction, saveVideoAction, updateTrainingAction } from './async-actions';

const initialState: TrainingState = {
  training: {} as ITraining,
  loadStatus: LoadStatus.Never,
  error: '',
};

export const trainingSlice = createSlice({
  name: SliceName.Training,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchTrainingAction.fulfilled, (state, { payload }) => {
        state.training = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchTrainingAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(createTrainingAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(createTrainingAction.fulfilled, (state, { payload }) => {
        state.training = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(createTrainingAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(updateTrainingAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(updateTrainingAction.fulfilled, (state, {payload}) => {
        state.training = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(updateTrainingAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(removeVideoAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(removeVideoAction.fulfilled, (state, {payload}) => {
        state.training = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(removeVideoAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(saveVideoAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(saveVideoAction.fulfilled, (state, {payload}) => {
        state.training = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(saveVideoAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});

