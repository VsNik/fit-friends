import { createSlice } from '@reduxjs/toolkit';
import { TrainingState } from '../../types/state-type';
import { ITraining } from '@fit-friends/shared';
import { SliceName } from '../../constants/common';

const initialState: TrainingState = {
  training: {} as ITraining,
  isLoading: false,
  error: '',
};

export const trainingSlice = createSlice({
  name: SliceName.Training,
  initialState,
  reducers: {},
});

export default trainingSlice.reducer;
