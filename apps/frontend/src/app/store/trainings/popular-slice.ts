import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularAction } from './async-actions';
import { TrainingsState } from '../../types/state-type';

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  isLoading: false,
  error: '',
};

export const popularSlice = createSlice({
  name: 'popular-trainings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchPopularAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      });
  },
});

export default popularSlice.reducer;
