import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { TrainingsState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeTrainingCollection } from '../../utils/mock-data';
import { fetchForYouAction } from './async-actions';
import { forYouSlice } from './for-you-slice';

describe('forYouSlice test', () => {
  let state: TrainingsState;

  beforeEach(() => {
    state = {
      trainings: [],
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      loadStatus: LoadStatus.Never,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(forYouSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Never, error: null});
  });

  describe('fetchForYouAction test', () => {
    it('should be change loadStatus to Loading if fetchForYouAction pending', function () {
      expect(forYouSlice.reducer(state, {type: fetchForYouAction.pending.type}))
        .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update trainings for fetchForYouAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      expect(forYouSlice.reducer(state, {type: fetchForYouAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({trainings: fakeTrainings.data, page: fakeTrainings.page, total: fakeTrainings.total, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if fetchForYouAction pending', function () {
      expect(forYouSlice.reducer(state, {type: fetchForYouAction.rejected.type}))
        .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded, error: null})
    });
  })
});
