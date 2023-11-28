import { createSlice } from '@reduxjs/toolkit';
import { addReviewAction, fetchReviewsAction } from './async-actions';
import { ReviewsState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: ReviewsState = {
  reviews: [],
  loadStatus: LoadStatus.Never,
};

export const reviewsSlice = createSlice({
  name: SliceName.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(addReviewAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(addReviewAction.fulfilled, (state, { payload }) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
