import { ITraining } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';

export interface TrainingsState {
  trainings: ITraining[];
  page: number;
  total: number;
  isLoading: boolean;
  error: string;
}

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  isLoading: false,
  error: '',
};

export const trainingeSlice = createSlice({
  name: 'trainings',
  initialState,
  reducers: {},
});

export default trainingeSlice.reducer;
