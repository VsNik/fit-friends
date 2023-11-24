import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewApi } from '../../services/review-api';
import { IReview } from '@fit-friends/shared';
import { CreateReviewType } from '../../types/common';

export const fetchReviewsAction = createAsyncThunk<IReview[], string>('reviews/fetch', async (trainingId) => {
  const data = await reviewApi.fetchReviews();
  return data;
});

export const addReviewAction = createAsyncThunk<CreateReviewType, CreateReviewType>(
  'reviews/add-review',
  async (review) => {
    const data = await reviewApi.addReview(review);
    console.log(data);
    return data;
  }
)
