import { IAlertCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import api from './api';

export const notificationApi = {
  fetchNotification: (): Promise<AxiosResponse<IAlertCollection>> => {
    return api.get<IAlertCollection>('/alerts');
  },

  removeNorification: (id: string): Promise<AxiosResponse<void>> => {
    return api.delete(`/alerts/${id}`);
  }
};
