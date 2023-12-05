import { IUser, IUserCollection } from '@fit-friends/shared';
import { fakeCompanyUser, fakeUsers, testUser } from '../fake-data/fake-user';
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
    // const user = fakeUsers.data.find((user) => user.id === id)!;
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(user), TIMEOUT);
    // });
  },

  fetchCompany: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeCompanyUser), TIMEOUT);
    });
  },

  fetchUsers: (queryString: string): Promise<AxiosResponse<IUserCollection>> => {
    return api.get<IUserCollection>(`/users${queryString}`)
    // return new Promise((resolve) => {
    //   setTimeout(() => resolve(fakeUsers), TIMEOUT);
    // });
  },

  fetchUserFriends: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), TIMEOUT);
    });
  },

  fetchCoachFriends: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), TIMEOUT);
    });
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
    return api.post<IUser>('/users/certificate/remove', {src});
  },

  toFriend: (id: string): Promise<AxiosResponse<void>> => {
    return api.post(`/users/${id}/follow`);
  }
};
