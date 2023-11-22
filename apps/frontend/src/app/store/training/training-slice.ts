import { createSlice } from '@reduxjs/toolkit';
import { TrainingState } from '../../types/state-type';
import { ITraining } from '@fit-friends/shared';

const initialState: TrainingState = {
  training: {} as ITraining,
  isLoading: false,
  error: '',
};

export const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {},
});

export default trainingSlice.reducer;
