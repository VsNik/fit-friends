import { IReview } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fakeReviews } from '../../fake-data/fake-review';

export const fetchReviews = (): Promise<IReview[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeReviews), 500);
  });
};

export const fetchReviewsAction = createAsyncThunk('reviews/fetch', async () => {
  const data = await fetchReviews();
  return data;
});
