import { IUser, IUserCollection } from '@fit-friends/shared';
import { testUser } from '../fake-data/fake-user';
import api from './api';
import { AxiosResponse } from 'axios';

const TIMEOUT = 500;

export const userApi = {
  fetchAuth: (): Promise<IUser> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(testUser), TIMEOUT);
    });
  },

  fetchUser: (id: string): Promise<AxiosResponse<IUser>> => {
    return api.get<IUser>(`/users/${id}/show`);
  },

  fetchCompany: (): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>('/users/company');
  },

  fetchUsers: (queryString: string): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>(`/users${queryString}`);
  },

  fetchUserFriends: (): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>('/users/friends-user');
  },

  fetchCoachFriends: (): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>('/users/friends-coach');
  },

  updateUser: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.patch<IUser>('/users', formData);
  },

  addCertificate: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.post<IUser>('/users/certificate', formData);
  },

  updateCertificate: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.patch<IUser>('/users/certificate', formData);
  },

  deleteCertificate: (src: string): Promise<AxiosResponse<IUser>> => {
    return api.post<IUser>('/users/certificate/remove', { src });
  },

  toFriend: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(`/users/${id}/follow`);
  },

  removeFriend: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(`/users/${id}/coach-unfollow`);
  },

  subscribe: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(`/users/${id}/subscribe`);
  },
};
