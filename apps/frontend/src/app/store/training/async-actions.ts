import { ITraining } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { trainingApi } from '../../services/training-api';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { redirectToRoute } from '../action';
import { RouteName } from '../../constants/route';

export const fetchTrainingAction = createAsyncThunk<ITraining, string>(
  'training/fetch-training', 
  async (id) => {
    const {data} = await trainingApi.fetchTraining(id);
    return data;
});

export const createTrainingAction = createAsyncThunk<ITraining, FormData, {dispatch: AppDispatch}>(
  'training/create-training', 
  async (formData, {dispatch, rejectWithValue}) => {
    try {
      const {data} = await trainingApi.createTraining(formData);
      dispatch(redirectToRoute(RouteName.MyTrainings));
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);
