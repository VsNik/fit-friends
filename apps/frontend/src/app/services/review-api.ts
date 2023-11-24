import { IReview } from '@fit-friends/shared';
import { fakeReviews } from '../fake-data/fake-review';
import { CreateReviewType } from '../types/common';

const TIMEOUT = 500;

export const reviewApi = {
  fetchReviews: (): Promise<IReview[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeReviews), TIMEOUT);
    });
  },

  addReview: (review: CreateReviewType): Promise<CreateReviewType> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(review), TIMEOUT);
    });
  },
};
