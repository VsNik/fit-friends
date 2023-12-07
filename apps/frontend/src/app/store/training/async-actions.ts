import { ITraining } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { trainingApi } from '../../services/training-api';
import { AxiosError } from 'axios';
import { AppDispatch } from '..';
import { redirectToRoute } from '../action';
import { RouteName } from '../../constants/route';
import { UpdateTrainingType } from '../../types/forms-type';

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

export const updateTrainingAction = createAsyncThunk<ITraining, {id: string, updateData: UpdateTrainingType}>(
  'training/update',
  async ({id, updateData}) => {
    const {data} = await trainingApi.updateTraining(id, updateData);
    return data;
  }
)

export const removeVideoAction = createAsyncThunk<ITraining, {id: string, src: string}>(
  'training/remove-video',
  async ({id, src}) => {
    const {data} = await trainingApi.removeVideo(id, src);
    return data;
  }
)

export const saveVideoAction = createAsyncThunk<ITraining, {id: string, formData: FormData}>(
  'training/save-video',
  async ({id, formData}) => {
    const {data} = await trainingApi.saveVideo(id, formData);
    return data;
  }
)

