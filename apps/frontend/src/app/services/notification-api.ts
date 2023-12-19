import { IAlertCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import api from './api';
import { ApiRoute } from '../constants/route';
import { generatePath } from 'react-router-dom';

export const notificationApi = {
  fetchAkert: (): Promise<AxiosResponse<IAlertCollection>> => {
    return api.get<IAlertCollection>(ApiRoute.Alerts);
  },

  removeAlert: (id: string): Promise<AxiosResponse<void>> => {
    return api.delete(generatePath(ApiRoute.Alert, {id}));
  },

  sendNotify: (): Promise<AxiosResponse<void>> => {
    return api.get(ApiRoute.Notify);
  }
};
