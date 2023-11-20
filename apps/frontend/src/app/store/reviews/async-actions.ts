import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewApi } from '../../services/review-api';

export const fetchReviewsAction = createAsyncThunk('reviews/fetch', async () => {
  const data = await reviewApi.fetchReviews();
  return data;
});
