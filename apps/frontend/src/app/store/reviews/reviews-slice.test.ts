import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { ReviewsState } from '../../types/state-type';
import { UNKNOWN_ACTION, fakeError, makeFakeReview, makeFakeReviewCollection } from '../../utils/mock-data';
import { notificationsSlice } from '../notifications/notifications-slice';
import { addReviewAction, fetchReviewsAction } from './async-actions';
import { reviewsSlice } from './reviews-slice';

describe('ReviewsSlice test', () => {
  let state: ReviewsState;

  beforeEach(() => {
    state = {
      reviews: [],
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      loadStatus: LoadStatus.Never,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(notificationsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({notifications: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Never});
  });

  describe('fetchReviewsAction test', () => {
    it('should be change loadStatus to Loading if fetchReviewsAction pending', function () {
      expect(reviewsSlice.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({reviews: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update reviews  if fetchReviewsAction fulfilled', function () {
      const fakeReviews = makeFakeReviewCollection();
      expect(reviewsSlice.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({reviews: fakeReviews.data, page: fakeReviews.page, total: fakeReviews.total, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if fetchReviewsAction rejected', function () {
      expect(reviewsSlice.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({reviews: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded, error: null})
    });
  });

  describe('addReviewAction test', () => {
    it('should be change loadStatus to Loading if addReviewAction pending', function () {
      expect(reviewsSlice.reducer(state, {type: addReviewAction.pending.type}))
        .toEqual({reviews: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update reviews if addReviewAction fulfilled', function () {
      const existReviews = (makeFakeReviewCollection()).data;
      const review = makeFakeReview();
      const updatedReviews = [review, ...existReviews];

      state.reviews = existReviews;

      expect(reviewsSlice.reducer(state, {type: addReviewAction.fulfilled.type, payload: review}))
        .toEqual({reviews: updatedReviews, page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if addReviewAction rejected', function () {
      expect(reviewsSlice.reducer(state, {type: addReviewAction.rejected.type, payload: fakeError}))
        .toEqual({reviews: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded, error: fakeError})
    });
  });
});
