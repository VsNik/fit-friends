import { IReview, IReviewCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import { CreateReviewType } from '../types/forms-type';
import api from './api';
import { generatePath } from 'react-router-dom';
import { ApiRoute } from '../constants/route';

export const reviewApi = {
  fetchReviews: (id: string): Promise<AxiosResponse<IReviewCollection>> => {
    return api.get<IReviewCollection>(generatePath(ApiRoute.Reviews, {id}));
  },

  addReview: (id: string, review: CreateReviewType): Promise<AxiosResponse<IReview>> => {
    return api.post<IReview>(generatePath(ApiRoute.Reviews, {id}), review);
  },
};
