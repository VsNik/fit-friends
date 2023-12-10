import { createSlice } from '@reduxjs/toolkit';
import { addReviewAction, fetchReviewsAction } from './async-actions';
import { ReviewsState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';

const initialState: ReviewsState = {
  reviews: [],
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
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
        state.reviews = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(addReviewAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(addReviewAction.fulfilled, (state, { payload }) => {
        state.reviews.unshift(payload)
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});
