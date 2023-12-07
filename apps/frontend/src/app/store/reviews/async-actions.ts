import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewApi } from '../../services/review-api';
import { IReview, IReviewCollection } from '@fit-friends/shared';
import { CreateReviewType } from '../../types/forms-type';

export const fetchReviewsAction = createAsyncThunk<IReviewCollection, string>(
  'reviews/fetch', 
  async (trainingId) => {
    const {data} = await reviewApi.fetchReviews(trainingId);
    return data;
});

export const addReviewAction = createAsyncThunk<IReview, {id: string, review: CreateReviewType}>(
  'reviews/add-review', 
  async ({id, review}) => {
    const {data} = await reviewApi.addReview(id, review);
    return data;
});
