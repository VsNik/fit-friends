import { createSlice } from '@reduxjs/toolkit';
import { TrainingsState } from './trainings-slice';
import { fetchForYouAction } from './async-actions';

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  isLoading: false,
  error: '',
};

export const forYouSlice = createSlice({
  name: 'for-you-trainings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForYouAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchForYouAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      });
  },
});

export default forYouSlice.reducer;
