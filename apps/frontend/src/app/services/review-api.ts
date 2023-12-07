import { IReview, IReviewCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import { CreateReviewType } from '../types/forms-type';
import api from './api';

export const reviewApi = {
  fetchReviews: (id: string): Promise<AxiosResponse<IReviewCollection>> => {
    return api.get<IReviewCollection>(`/reviews/${id}`)
  },

  addReview: (id: string, review: CreateReviewType): Promise<AxiosResponse<IReview>> => {
    return api.post<IReview>(`/reviews/${id}`, review);
  },
};
