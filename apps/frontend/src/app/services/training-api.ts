import { ITraining, ITrainingCollection } from '@fit-friends/shared';
import { fakeForYouTrainings } from '../fake-data/fake-training';
import { AxiosResponse } from 'axios';
import api from './api';
import { UpdateTrainingType } from '../types/forms-type';

const TIMEOUT = 500;

export const trainingApi = {
  fetchTraining: (id: string): Promise<AxiosResponse<ITraining>> => {
    return api.get<ITraining>(`/trainings/${id}`);
  },

  fetchTrainings: (queryString: string): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`/trainings${queryString}`);
  },

  fetchForYou: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeForYouTrainings), TIMEOUT);
    });
  },

  fetchSpecial: (): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>('/trainings/special');
  },

  fetchPopular: (): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>('/trainings/popular');
  },

  // fetchForCoach: (): Promise<ITrainingCollection> => {
  //   return new Promise((resolce) => {
  //     setTimeout(() => resolce(getFakeTrainings(8)), TIMEOUT);
  //   });
  // },

  fetchOrderTraining: (queryString: string): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`/trainings/orders${queryString}`);
  },

  fetchMyTrainings: (authId: string, queryString = ''): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`/trainings/${authId}/coach${queryString}`);
  },

  createTraining: (formData: FormData): Promise<AxiosResponse<ITraining>> => {
    return api.post<ITraining>('/trainings', formData);
  },

  updateTraining: (id: string, data: UpdateTrainingType): Promise<AxiosResponse<ITraining>> => {
    return api.patch<ITraining>(`/trainings/${id}`, data);
  },

  removeVideo: (id: string, src: string): Promise<AxiosResponse<ITraining>> => {
    return api.patch<ITraining>(`/trainings/${id}/remove/video`, src);
  },

  saveVideo: (id: string, formData: FormData): Promise<AxiosResponse<ITraining>> => {
    return api.patch<ITraining>(`/trainings/${id}/upload/video`, formData);
  }
};
