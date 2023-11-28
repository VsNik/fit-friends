import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrainingCollection } from '@fit-friends/shared';
import { trainingApi } from '../../services/training-api';

export const fetchTrainingsAction = createAsyncThunk<ITrainingCollection, string>('trainings/fetch-trainings', async (queryString) => {
  console.log(queryString);
  const data = await trainingApi.fetchTrainings(12);
  return data;
});

export const fetchForYouAction = createAsyncThunk<ITrainingCollection>('for-tou/fetch-for-you', async () => {
  const data = await trainingApi.fetchForYou();
  return data;
});

export const fetchSpecialAction = createAsyncThunk<ITrainingCollection>('special/fetch-special', async () => {
  const data = await trainingApi.fetchSpecial();
  return data;
});

export const fetchPopularAction = createAsyncThunk<ITrainingCollection>('popular/fetch-popular', async () => {
  const data = await trainingApi.fetchPopular();
  return data;
});

export const fetchForCoachAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-for-coach', async () => {
  const data = await trainingApi.fetchForCoach();
  return data;
});

export const fetchMyOrdersAction = createAsyncThunk<ITrainingCollection, string>('trainings/fetch-order-trainings', async (queryString) => {
  console.log(queryString);
  const data = await trainingApi.fetchOrderTraining();
  return data;
});

export const fetchMyTrainingsAction = createAsyncThunk<ITrainingCollection, string>('trainings/fetch-my-trainings', async (queryString) => {
  console.log(queryString);
  const data = await trainingApi.fetchMyTrainings();
  return data;
});

export const fetchPurchasesAction = createAsyncThunk<ITrainingCollection>('trainings/purchases', async () => {
  const data = await trainingApi.fetchTrainings(4);
  return data;
});
