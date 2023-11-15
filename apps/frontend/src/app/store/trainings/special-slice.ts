import { createSlice } from '@reduxjs/toolkit';
import { TrainingsState } from './trainings-slice';
import { fetchSpecialAction } from './async-actions';

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  isLoading: false,
  error: '',
};

export const specialSlice = createSlice({
  name: 'special-trainings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchSpecialAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      });
  },
});

export default specialSlice.reducer;
