import { TrainingSortDirection, StatisticSorting, TrainingSorting } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchForCoachAction, fetchMyTrainingsAction, fetchMyOrdersAction, fetchPurchasesAction, fetchTrainingsAction } from './async-actions';
import { TrainingListState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: TrainingListState = {
  trainings: [],
  page: 1,
  total: 50,
  filter: {
    priceTo: 0,
    priceFrom: 10000,
    caloriesTo: 1000,
    caloriesFrom: 5000,
    ratingTo: 0,
    ratingFrom: 5,
    types: [],
    durations: [],
  },
  sorting: TrainingSorting.Created,
  sortStatistic: StatisticSorting.OrderCount,
  direction: TrainingSortDirection.Desc,
  loadStatus: LoadStatus.Never,
  error: '',
};

export const trainingsSlice = createSlice({
  name: SliceName.Trainings,
  initialState,
  reducers: {
    setPriceAction: (state, { payload }) => {
      state.filter.priceTo = payload[0];
      state.filter.priceFrom = payload[1];
    },
    setCaloriesAction: (state, { payload }) => {
      state.filter.caloriesTo = payload[0];
      state.filter.caloriesFrom = payload[1];
    },
    setRatingAction: (state, { payload }) => {
      state.filter.ratingTo = payload[0];
      state.filter.ratingFrom = payload[1];
    },
    setDirectionAction: (state, { payload }) => {
      state.sorting = TrainingSorting.Price;
      state.direction = payload;
    },
    setTypeAction: (state, { payload }) => {
      if (!state.filter.types?.includes(payload)) {
        state.filter.types?.push(payload);
      } else {
        state.filter.types = state.filter.types.filter((item) => item !== payload);
      }
    },
    setDurationAction: (state, {payload}) => {
      if (!state.filter.durations?.includes(payload)) {
        state.filter.durations?.push(payload);
      } else {
        state.filter.durations = state.filter.durations.filter((item) => item !== payload);
      }
    },
    setSortStatisticAction: (state, { payload }) => {
      state.sortStatistic = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = '';
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchForCoachAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchForCoachAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchMyOrdersAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchMyOrdersAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchMyTrainingsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchMyTrainingsAction.fulfilled, (state, {payload}) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchPurchasesAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchPurchasesAction.fulfilled, (state, {payload}) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});

export const { 
  setPriceAction, 
  setCaloriesAction, 
  setRatingAction, 
  setDirectionAction, 
  setTypeAction, 
  setDurationAction,
  setSortStatisticAction, 
} = trainingsSlice.actions;
