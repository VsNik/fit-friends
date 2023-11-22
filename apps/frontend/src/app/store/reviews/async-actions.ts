import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewApi } from '../../services/review-api';
import { IReview } from '@fit-friends/shared';

export const fetchReviewsAction = createAsyncThunk<IReview[], string>('reviews/fetch', async (trainingId) => {
  const data = await reviewApi.fetchReviews();
  return data;
});
