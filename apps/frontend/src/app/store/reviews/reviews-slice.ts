import { createSlice } from '@reduxjs/toolkit';
import { IReview } from '@fit-friends/shared';
import { fetchReviewsAction } from './async-actions';

export interface ReviewsState {
  reviews: IReview[];
  isLoading: boolean;
}

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
        .addCase(fetchReviewsAction.fulfilled, (state, {payload}) => {
            state.reviews = payload;
            state.isLoading = false;
        })
  }
});

export default reviewsSlice.reducer;
