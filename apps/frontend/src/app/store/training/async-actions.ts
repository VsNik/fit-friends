import { ITraining } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { trainingApi } from '../../services/training-api';
import { AxiosError } from 'axios';

export const fetchTrainingAction = createAsyncThunk<ITraining, string>('training/fetch-training', async (id) => {
  const data = await trainingApi.fetchTraining();
  return data;
});

export const createTrainingAction = createAsyncThunk<ITraining, FormData>(
  'training/create-training', 
  async (formData, {rejectWithValue}) => {
    try {
          const {data} = await trainingApi.createTraining(formData);
    return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);
