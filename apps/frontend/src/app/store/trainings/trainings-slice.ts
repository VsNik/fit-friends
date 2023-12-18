import { TrainingSortDirection, StatisticSorting, TrainingSorting } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchForCoachAction,
  fetchMyTrainingsAction,
  fetchMyOrdersAction,
  fetchTrainingsAction,
  loadMoreAction,
  loadMoreMyOrdersAction,
  loadMoreTrainingsAction,
} from './async-actions';
import { TrainingListState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';
import { ReviewValidate, TrainingValidate } from '@fit-friends/libs/validation';

const initialState: TrainingListState = {
  trainings: [],
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
  filter: {
    priceTo: TrainingValidate.PriceMin,
    priceFrom: TrainingValidate.PriceMax,
    caloriesTo: TrainingValidate.CaloryMin,
    caloriesFrom: TrainingValidate.CaloryMax,
    ratingTo: ReviewValidate.RatingMin,
    ratingFrom: ReviewValidate.RatingMax,
    types: [],
    durations: [],
  },
  sorting: TrainingSorting.Created,
  sortStatistic: StatisticSorting.OrderCount,
  direction: TrainingSortDirection.Desc,
  loadStatus: LoadStatus.Never,
  error: null,
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
    setDurationAction: (state, { payload }) => {
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
        state.error = null;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchTrainingsAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(loadMoreTrainingsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(loadMoreTrainingsAction.fulfilled, (state, { payload }) => {
        state.trainings = [...state.trainings, ...payload.data];
        state.page = payload.page;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(loadMoreTrainingsAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchForCoachAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(fetchForCoachAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchForCoachAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchMyOrdersAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(fetchMyOrdersAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchMyOrdersAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(loadMoreMyOrdersAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(loadMoreMyOrdersAction.fulfilled, (state, { payload }) => {
        state.page = payload.page;
        state.trainings = [...state.trainings, ...payload.data];
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(loadMoreMyOrdersAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchMyTrainingsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(fetchMyTrainingsAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchMyTrainingsAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(loadMoreAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(loadMoreAction.fulfilled, (state, { payload }) => {
        state.page = payload.page;
        state.trainings = [...state.trainings, ...payload.data];
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(loadMoreAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});

export const { 
  setPriceAction, 
  setCaloriesAction, 
  setRatingAction, 
  setDirectionAction, 
  setTypeAction, 
  setDurationAction, 
  setSortStatisticAction 
} = trainingsSlice.actions;
