import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrainingCollection } from '@fit-friends/shared';
import { trainingApi } from '../../services/training-api';

export const fetchTrainingsAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-trainings', async () => {
  const data = await trainingApi.fetchTrainings(12);
  return data;
});

export const fetchForYouAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-for-you', async () => {
  const data = await trainingApi.fetchForYou();
  return data;
});

export const fetchSpecialAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-special', async () => {
  const data = await trainingApi.fetchSpecial();
  return data;
});

export const fetchPopularAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-popular', async () => {
  const data = await trainingApi.fetchPopular();
  return data;
});

