import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrainingCollection } from '@fit-friends/shared';
import { trainingApi } from '../../services/training-api';

export const fetchTrainingsAction = createAsyncThunk<ITrainingCollection, string>(
  'trainings/fetch-trainings', 
  async (queryString) => {
  const {data} = await trainingApi.fetchTrainings(queryString);
  return data;
});

export const fetchForYouAction = createAsyncThunk<ITrainingCollection>('for-tou/fetch-for-you', async () => {
  const data = await trainingApi.fetchForYou();
  return data;
});

export const fetchSpecialAction = createAsyncThunk<ITrainingCollection>(
  'special/fetch-special', 
  async () => {
    const {data} = await trainingApi.fetchSpecial();
    return data;
});

export const fetchPopularAction = createAsyncThunk<ITrainingCollection>(
  'popular/fetch-popular', 
  async () => {
    const {data} = await trainingApi.fetchPopular();
    return data;
});

export const fetchForCoachAction = createAsyncThunk<ITrainingCollection, string>(
  'trainings/fetch-for-coach', 
  async (id) => {
    const {data} = await trainingApi.fetchMyTrainings(id);
    return data;
});

export const fetchMyOrdersAction = createAsyncThunk<ITrainingCollection, string>(
  'trainings/fetch-order-trainings', 
  async (queryString) => {
    const {data} = await trainingApi.fetchOrderTraining(queryString);
    return data;
});

export const fetchMyTrainingsAction = createAsyncThunk<ITrainingCollection, {authId: string, queryString?: string}>(
  'trainings/fetch-my-trainings', 
  async ({authId, queryString}) => {
    const {data} = await trainingApi.fetchMyTrainings(authId, queryString);
    return data;
});

export const loadMoreAction = createAsyncThunk<ITrainingCollection, {authId: string, queryString: string}>(
  'trainings/load-more',
  async ({authId, queryString}) => {
    const {data} = await trainingApi.fetchMyTrainings(authId, queryString);
    return data;
  }
)
