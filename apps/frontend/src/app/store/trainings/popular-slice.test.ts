import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { TrainingsState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeTrainingCollection } from '../../utils/mock-data';
import { fetchPopularAction } from './async-actions';
import { popularSlice } from './popular-slice';

describe('popularSlice test', () => {
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
    expect(popularSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Never, error: null});
  });

  describe('fetchPopularAction test', function () {
    it('should be change loadStatus to Loading if fetchPopularAction pending', function () {
      expect(popularSlice.reducer(state, {type: fetchPopularAction.pending.type}))
        .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update trainings if fetchPopularAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      expect(popularSlice.reducer(state, {type: fetchPopularAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({trainings: fakeTrainings.data, page: fakeTrainings.page, total: fakeTrainings.total, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if fetchPopularAction pending', function () {
      expect(popularSlice.reducer(state, {type: fetchPopularAction.rejected.type}))
        .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded, error: null})
    });
  });
});
