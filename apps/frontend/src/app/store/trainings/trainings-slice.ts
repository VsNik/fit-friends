import { ITraining, TrainingDuration, TrainingType } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrainingsAction } from './async-actions';

export interface TrainingsState {
  trainings: ITraining[];
  page: number;
  total: number;
  priceTo?: number;
  priceFrom?: number;
  caloriesTo?: number;
  caloriesFrom?: number;
  ratingTo?: number;
  ratingFrom?: number;
  duration?: TrainingDuration | null;
  type?: TrainingType[];  
  isLoading: boolean;
  error: string;
}

const initialState: TrainingsState = {
  trainings: [],
  page: 1,
  total: 50,
  priceTo: 0,
  priceFrom: 10000,
  caloriesTo: 1000,
  caloriesFrom: 5000,
  ratingTo: 0,
  ratingFrom: 5,
  duration: null,
  type: [],  
  isLoading: false,
  error: '',
};

export const trainingeSlice = createSlice({
  name: 'trainings',
  initialState,
  reducers: {
    setPriceAction: (state, {payload}) => {
      console.log(payload)
      state.priceTo = payload[0];
      state.priceFrom = payload[1];
    },
    setCaloriesAction: (state, {payload}) => {
      state.caloriesTo = payload[0];
      state.caloriesFrom = payload[1];
    },
    setRatingAction: (state, {payload}) => {
      state.ratingTo = payload[0];
      state.ratingFrom = payload[1];
    },
    setDurationAction: (state, {payload}) => {
      state.duration = payload;
    },
    setTypeAction: (state, {payload}) => {
      if (!state.type?.includes(payload)) {
        state.type?.push(payload);
      } else {
        state.type = state.type.filter((item) => item !== payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, {payload}) => {
        state.trainings = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      })
  }
});

export const {setPriceAction, setCaloriesAction, setRatingAction, setDurationAction, setTypeAction} = trainingeSlice.actions;
export default trainingeSlice.reducer;
