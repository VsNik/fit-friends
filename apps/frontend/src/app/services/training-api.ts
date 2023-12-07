import { ITraining, ITrainingCollection } from '@fit-friends/shared';
import { fakeForYouTrainings, fakeOrderTrainings, fakePopularTrainings, fakeSpecialTrainings, getFakeTrainings } from '../fake-data/fake-training';
import { AxiosResponse } from 'axios';
import api from './api';

const TIMEOUT = 500;

export const trainingApi = {
  fetchTraining: (id: string): Promise<AxiosResponse<ITraining>> => {
    return api.get<ITraining>(`/trainings/${id}`);
  },

  fetchTrainings: (count: number): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getFakeTrainings(count)), TIMEOUT);
    });
  },

  fetchForYou: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeForYouTrainings), TIMEOUT);
    });
  },

  fetchSpecial: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeSpecialTrainings), TIMEOUT);
    });
  },

  fetchPopular: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakePopularTrainings), TIMEOUT);
    });
  },

  fetchForCoach: (): Promise<ITrainingCollection> => {
    return new Promise((resolce) => {
      setTimeout(() => resolce(getFakeTrainings(8)), TIMEOUT);
    });
  },

  fetchOrderTraining: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeOrderTrainings), TIMEOUT);
    });
  },

  fetchMyTrainings: (authId: string, queryString = ''): Promise<AxiosResponse<ITrainingCollection>> => {
    return api.get<ITrainingCollection>(`/trainings/${authId}/coach${queryString}`);
  },

  createTraining: (formData: FormData): Promise<AxiosResponse<ITraining>> => {
    return api.post<ITraining>('/trainings', formData);
  },
};
