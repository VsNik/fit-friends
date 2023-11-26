import { createSlice } from '@reduxjs/toolkit';
import { TrainingState } from '../../types/state-type';
import { ITraining } from '@fit-friends/shared';
import { SliceName } from '../../constants/common';
import { createTrainingAction, fetchTrainingAction } from './async-actions';

const initialState: TrainingState = {
  training: {} as ITraining,
  isLoading: false,
  error: '',
};

export const trainingSlice = createSlice({
  name: SliceName.Training,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainingAction.fulfilled, (state, { payload }) => {
        state.training = payload;
        state.isLoading = false;
      })

      .addCase(createTrainingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrainingAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

