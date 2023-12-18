import { IUser, IUserCollection } from '@fit-friends/shared';
import { AxiosResponse } from 'axios';
import api from './api';
import { generatePath } from 'react-router-dom';
import { ApiUser } from '../constants/route';

export const userApi = {
  fetchUser: (id: string): Promise<AxiosResponse<IUser>> => {
    return api.get<IUser>(generatePath(ApiUser.Show, {id}));
  },

  fetchCompany: (): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>(ApiUser.Company);
  },

  fetchUsers: (queryString: string): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>(`${ApiUser.All}${queryString}`);
  },

  fetchUserFriends: (queryString: string): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>(`${ApiUser.FriendsUser}${queryString}`);
  },

  fetchCoachFriends: (queryString: string): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>(`${ApiUser.FriendsCoach}${queryString}`);
  },

  updateUser: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.patch<IUser>(ApiUser.All, formData);
  },

  addCertificate: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.post<IUser>(ApiUser.Certificate, formData);
  },

  updateCertificate: (formData: FormData): Promise<AxiosResponse<IUser>> => {
    return api.patch<IUser>(ApiUser.Certificate, formData);
  },

  deleteCertificate: (src: string): Promise<AxiosResponse<IUser>> => {
    return api.post<IUser>(ApiUser.CertificateRemove, { src });
  },

  toFriend: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(generatePath(ApiUser.ToFriend, {id}));
  },

  removeFriend: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(generatePath(ApiUser.RemoveFriendForCoach, {id}));
  },

  subscribe: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(generatePath(ApiUser.Subscribe, {id}));
  },
};
