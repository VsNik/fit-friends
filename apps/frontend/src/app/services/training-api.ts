import { ITraining, ITrainingCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import { UpdateTrainingType } from '../types/forms-type';
import api from './api';
import { generatePath } from 'react-router-dom';
import { ApiTrainings } from '../constants/route';

export const trainingApi = {
  fetchTraining: (id: string): Promise<AxiosResponse<ITraining>> => {
    return api.get<ITraining>(generatePath(ApiTrainings.Show, {id}));
  },

  fetchTrainings: (queryString: string): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`${ApiTrainings.All}${queryString}`);
  },

  fetchForYou: (): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(ApiTrainings.ForYou);
  },

  fetchSpecial: (): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(ApiTrainings.Special);
  },

  fetchPopular: (): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(ApiTrainings.Popular);
  },

  fetchOrderTraining: (queryString: string): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`${ApiTrainings.Orders}${queryString}`);
  },

  fetchMyTrainings: (authId: string, queryString = ''): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`${generatePath(ApiTrainings.ForCoach, {id: authId})}${queryString}`);
  },

  createTraining: (formData: FormData): Promise<AxiosResponse<ITraining>> => {
    return api.post<ITraining>(ApiTrainings.All, formData);
  },

  updateTraining: (id: string, data: UpdateTrainingType): Promise<AxiosResponse<ITraining>> => {
    return api.patch<ITraining>(generatePath(ApiTrainings.Show, {id}), data);
  },

  removeVideo: (id: string, src: string): Promise<AxiosResponse<ITraining>> => {
    return api.patch<ITraining>(generatePath(ApiTrainings.VideoRemove, {id}), src);
  },

  saveVideo: (id: string, formData: FormData): Promise<AxiosResponse<ITraining>> => {
    return api.patch<ITraining>(generatePath(ApiTrainings.VideoUpload, {id}), formData);
  }
};
