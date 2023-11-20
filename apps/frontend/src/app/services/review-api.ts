import { IReview } from '@fit-friends/shared';
import { fakeReviews } from '../fake-data/fake-review';

export const reviewApi = {
  fetchReviews: (): Promise<IReview[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeReviews), 500);
    });
  },
};
