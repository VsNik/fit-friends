import { IAuthToken, IUser, ICreatedProfile } from '@fit-friends/shared';
import { LoginType, QuestionUserType } from '../types/forms-type';
import { AxiosResponse } from 'axios';
import api from './api';
import { ApiAuthRoute } from '../constants/route';
import { generatePath } from 'react-router-dom';

export const authApi = {
  login: ({email, password}: LoginType): Promise<AxiosResponse<IAuthToken>> => {
    return api.post<IAuthToken>(ApiAuthRoute.Login, {email, password});
  },

  signup: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.post<IUser>(ApiAuthRoute.Signup, formData);
  },

  checkAuth: (): Promise<AxiosResponse<IUser>> => {
    return api.get<IUser>(ApiAuthRoute.Check);
  },

  createUser: (id: string, data: QuestionUserType): Promise<AxiosResponse<ICreatedProfile>> => {
    return api.post<ICreatedProfile>(generatePath(ApiAuthRoute.User, {id}), data);
  },

  createCoch: (id: string, formData: FormData): Promise<AxiosResponse<ICreatedProfile>> => {
    return api.post<ICreatedProfile>(generatePath(ApiAuthRoute.Coach, {id}), formData);
  },

  logout: (token: string): Promise<AxiosResponse<void>> => {
    return api.post(ApiAuthRoute.Logout, {refreshToken: token})
  }
};
