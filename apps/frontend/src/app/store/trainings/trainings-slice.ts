import { ITraining } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrainingsAction } from './async-actions';

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, {payload}) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      })
  }
});

export default trainingeSlice.reducer;
