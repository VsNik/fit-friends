import { IAuthToken, IUser, ICreatedProfile } from '@fit-friends/shared';
import { LoginType, QuestionUserType } from '../types/forms-type';
import { AxiosResponse } from 'axios';
import api from './api';

export const authApi = {
  login: ({email, password}: LoginType): Promise<AxiosResponse<IAuthToken>> => {
    return api.post<IAuthToken>('/auth/login', {email, password});
  },

  signup: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.post<IUser>('/auth/signup', formData);
  },

  checkAuth: (): Promise<AxiosResponse<IUser>> => {
    return api.get<IUser>('/auth/check');
  },

  createUser: (id: string, data: QuestionUserType): Promise<AxiosResponse<ICreatedProfile>> => {
    return api.post<ICreatedProfile>(`/auth/create/user/${id}`, data);
  },

  createCoch: (id: string, formData: FormData): Promise<AxiosResponse<ICreatedProfile>> => {
    return api.post<ICreatedProfile>(`/auth/create/coach/${id}`, formData);
  },

  logout: (token: string): Promise<AxiosResponse<void>> => {
    return api.post('/auth/logout', {refreshToken: token})
  }
};
