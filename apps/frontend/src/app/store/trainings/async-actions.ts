import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrainingCollection } from '@fit-friends/shared';
import { trainingApi } from '../../services/training-api';

// Каталог тренировок
export const fetchTrainingsAction = createAsyncThunk<ITrainingCollection, string>('trainings/fetch-trainings', async (queryString) => {
  console.log(queryString);
  const data = await trainingApi.fetchTrainings(12);
  return data;
});
// Слайдер (подобранно для Вас)
export const fetchForYouAction = createAsyncThunk<ITrainingCollection>('for-tou/fetch-for-you', async () => {
  const data = await trainingApi.fetchForYou();
  return data;
});
// Слайдер (спец. предложения)
export const fetchSpecialAction = createAsyncThunk<ITrainingCollection>('special/fetch-special', async () => {
  const data = await trainingApi.fetchSpecial();
  return data;
});
// Слайдер (популярные)
export const fetchPopularAction = createAsyncThunk<ITrainingCollection>('popular/fetch-popular', async () => {
  const data = await trainingApi.fetchPopular();
  return data;
});
// Слайдер в карточке тренира
export const fetchForCoachAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-for-coach', async () => {
  const data = await trainingApi.fetchForCoach();
  return data;
});
// Заказы тренира
export const fetchMyOrdersAction = createAsyncThunk<ITrainingCollection, string>('trainings/fetch-order-trainings', async (queryString) => {
  console.log(queryString);
  const data = await trainingApi.fetchOrderTraining();
  return data;
});
// Мои тренировки (тренировки созданные тренером)
export const fetchMyTrainingsAction = createAsyncThunk<ITrainingCollection, string>('trainings/fetch-my-trainings', async (queryString) => {
  console.log(queryString);
  const data = await trainingApi.fetchMyTrainings();
  return data;
});
// Мои покупки
export const fetchPurchasesAction = createAsyncThunk<ITrainingCollection>('trainings/purchases', async () => {
  const data = await trainingApi.fetchTrainings(4);
  return data;
});
