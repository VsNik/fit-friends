import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { TrainingsState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeTrainingCollection } from '../../utils/mock-data';
import { fetchSpecialAction } from './async-actions';
import { forYouSlice } from './for-you-slice';
import { specialSlice } from './special-slice';

describe('specialSlice test', () => {
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

  describe('fetchSpecialAction test', () => {
    it('should be change loadStatus to Loading if fetchSpecialAction pending', function () {
      expect(specialSlice.reducer(state, {type: fetchSpecialAction.pending.type}))
        .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading, error: null})
    });

    it('should be update trainings for fetchSpecialAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      expect(specialSlice.reducer(state, {type: fetchSpecialAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({trainings: fakeTrainings.data, page: fakeTrainings.page, total: fakeTrainings.total, loadStatus: LoadStatus.Loaded, error: null})
    });

    it('should be change loadStatus to Loaded if fetchSpecialAction pending', function () {
      expect(specialSlice.reducer(state, {type: fetchSpecialAction.rejected.type}))
        .toEqual({trainings: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded, error: null})
    });
  })
});
