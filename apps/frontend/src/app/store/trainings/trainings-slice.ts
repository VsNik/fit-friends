import { ITraining, SortDirection, TrainingSorting, TrainingType } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchForCoachAction, fetchTrainingsAction } from './async-actions';

export interface TrainingFilter {
  priceTo: number;
  priceFrom: number;
  caloriesTo: number;
  caloriesFrom: number;
  ratingTo: number;
  ratingFrom: number;
  types: TrainingType[];
}

interface TrainingListState {
  trainings: ITraining[];
  page: number;
  total: number;
  filter: TrainingFilter,
  sorting: TrainingSorting;
  direction: SortDirection | 'free' | null;  
  isLoading: boolean;
  error: string;
}

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
  },
  sorting: TrainingSorting.Created,
  direction: null,  
  isLoading: false,
  error: '',
};

export const trainingeSlice = createSlice({
  name: 'trainings',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, { payload }) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      })

      .addCase(fetchForCoachAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchForCoachAction.fulfilled, (state, {payload}) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      })
  },
});

export const { setPriceAction, setCaloriesAction, setRatingAction, setDirectionAction, setTypeAction } = trainingeSlice.actions;
export default trainingeSlice.reducer;
