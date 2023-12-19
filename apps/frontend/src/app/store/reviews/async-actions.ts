import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewApi } from '../../services/review-api';
import { IReview, IReviewCollection } from '@fit-friends/shared';
import { CreateReviewType } from '../../types/forms-type';
import { AxiosError } from 'axios';

export const fetchReviewsAction = createAsyncThunk<IReviewCollection, string>(
  'reviews/fetch', 
  async (trainingId) => {
    const {data} = await reviewApi.fetchReviews(trainingId);
    return data;
});

export const addReviewAction = createAsyncThunk<IReview, {id: string, review: CreateReviewType}>(
  'reviews/add-review', 
  async ({id, review}, {rejectWithValue}) => {
    try {
      const {data} = await reviewApi.addReview(id, review);
    return data;
    } catch(err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
});
