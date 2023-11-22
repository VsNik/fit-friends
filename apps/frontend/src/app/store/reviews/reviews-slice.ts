import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewsAction } from './async-actions';
import { ReviewsState } from '../../types/state-type';

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.isLoading = false;
      });
  },
});

export default reviewsSlice.reducer;
