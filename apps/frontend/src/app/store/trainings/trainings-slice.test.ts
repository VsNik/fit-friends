import { StatisticSorting, TrainingSortDirection, TrainingSorting } from '@fit-friends/shared';
import { TrainingListState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeTrainingCollection, mockTrainingFilter } from '../../utils/mock-data';
import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { trainingsSlice } from './trainings-slice';
import { fetchTrainingsAction, loadMoreTrainingsAction, fetchForCoachAction, fetchMyOrdersAction, loadMoreMyOrdersAction, fetchMyTrainingsAction, loadMoreAction } from './async-actions';

describe('trainingsSlice test', () => {
  let state: TrainingListState;

  beforeEach(() => {
    state = {
      trainings: [],
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      filter: mockTrainingFilter,
      sorting: TrainingSorting.Created,
      sortStatistic: StatisticSorting.OrderCount,
      direction: TrainingSortDirection.Desc,
      loadStatus: LoadStatus.Never,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(trainingsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({
        trainings: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockTrainingFilter,
        sorting: TrainingSorting.Created,
        sortStatistic: StatisticSorting.OrderCount,
        direction: TrainingSortDirection.Desc,
        loadStatus: LoadStatus.Never,
        error: null
      })
  });

  describe('fetchTrainingsAction test', () => {
    it('should be change loadStatus to Loading if fetchTrainingsAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: fetchTrainingsAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if fetchTrainingsAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      expect(trainingsSlice.reducer(state, {type: fetchTrainingsAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: fakeTrainings.data,
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if fetchTrainingsAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: fetchTrainingsAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  });

  describe('loadMoreTrainingsAction test', () => {
    it('should be change loadStatus to Loading if loadMoreTrainingsAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: loadMoreTrainingsAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if fetchTrainingsAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      state.trainings = fakeTrainings.data

      expect(trainingsSlice.reducer(state, {type: loadMoreTrainingsAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: [...state.trainings, ...fakeTrainings.data],
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if loadMoreTrainingsAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: loadMoreTrainingsAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  });

  describe('fetchForCoachAction test', () => {
    it('should be change loadStatus to Loading if fetchForCoachAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: fetchForCoachAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if fetchForCoachAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      expect(trainingsSlice.reducer(state, {type: fetchForCoachAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: fakeTrainings.data,
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if fetchForCoachAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: fetchForCoachAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  });

  describe('fetchMyOrdersAction test', () => {
    it('should be change loadStatus to Loading if fetchMyOrdersAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: fetchMyOrdersAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if fetchMyOrdersAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();

      expect(trainingsSlice.reducer(state, {type: fetchMyOrdersAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: fakeTrainings.data,
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if fetchMyOrdersAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: fetchMyOrdersAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  });

  describe('loadMoreMyOrdersAction test', () => {
    it('should be change loadStatus to Loading if loadMoreMyOrdersAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: loadMoreMyOrdersAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if loadMoreMyOrdersAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      state.trainings = fakeTrainings.data;
      expect(trainingsSlice.reducer(state, {type: loadMoreMyOrdersAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: [...state.trainings, ...fakeTrainings.data],
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if loadMoreMyOrdersAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: loadMoreMyOrdersAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  });

  describe('fetchMyTrainingsAction test', () => {
    it('should be change loadStatus to Loading if fetchMyTrainingsAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: fetchMyTrainingsAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if fetchMyTrainingsAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();

      expect(trainingsSlice.reducer(state, {type: fetchMyTrainingsAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: fakeTrainings.data,
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if fetchMyTrainingsAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: fetchMyTrainingsAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  });

  describe('loadMoreAction test', () => {
    it('should be change loadStatus to Loading if loadMoreAction pending', function () {
      expect(trainingsSlice.reducer(state, {type: loadMoreAction.pending.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loading,
          error: null
        })
    });

    it('should be update trainings if loadMoreAction fulfilled', function () {
      const fakeTrainings = makeFakeTrainingCollection();
      state.trainings = fakeTrainings.data;
      expect(trainingsSlice.reducer(state, {type: loadMoreAction.fulfilled.type, payload: fakeTrainings}))
        .toEqual({
          trainings: [...state.trainings, ...fakeTrainings.data],
          page: fakeTrainings.page,
          total: fakeTrainings.total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });

    it('should be change loadStatus to Loaded if loadMoreAction rejected', function () {
      expect(trainingsSlice.reducer(state, {type: loadMoreAction.rejected.type}))
        .toEqual({
          trainings: [],
          page: DefaultPaginate.Page,
          total: DefaultPaginate.Total,
          filter: mockTrainingFilter,
          sorting: TrainingSorting.Created,
          sortStatistic: StatisticSorting.OrderCount,
          direction: TrainingSortDirection.Desc,
          loadStatus: LoadStatus.Loaded,
          error: null
        })
    });
  })
});
