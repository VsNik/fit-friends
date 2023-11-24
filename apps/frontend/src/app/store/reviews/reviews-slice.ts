import { createSlice } from '@reduxjs/toolkit';
import { addReviewAction, fetchReviewsAction } from './async-actions';
import { ReviewsState } from '../../types/state-type';
import { SliceName } from '../../constants/common';

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
};

export const reviewsSlice = createSlice({
  name: SliceName.Reviews,
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
      })

      .addCase(addReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReviewAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});
