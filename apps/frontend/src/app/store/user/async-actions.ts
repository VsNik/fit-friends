import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/shared';
import { userApi } from '../../services/user-api';
import { authApi } from '../../services/auth-api';
import { AxiosError } from 'axios';

export const fetchAuthAction = createAsyncThunk<IUser>(
  'user/fetch-auth', 
  async () => {
    const { data } = await authApi.checkAuth();
    return data;
});

export const fetchUserAction = createAsyncThunk<IUser, string>(
  'user/fetch-user', 
  async (id) => {
    const { data } = await userApi.fetchUser(id);
    return data;
});

export const updateUserAction = createAsyncThunk<IUser, FormData>(
  'user/update', 
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateUser(formData);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
});

export const addCertificateAction = createAsyncThunk<IUser, FormData>(
  'user/add-certificate', 
  async (formData) => {
    const { data } = await userApi.addCertificate(formData);
    return data;
});

export const updateCertificateAction = createAsyncThunk<IUser, FormData>(
  'user/update-certificate', 
  async (formData) => {
    const { data } = await userApi.updateCertificate(formData);
    return data;
});

export const deleteCertificateAction = createAsyncThunk<IUser, string>(
  'user/delete-certificate', 
  async (src) => {
    const { data } = await userApi.deleteCertificate(src);
    return data;
});

export const toFriendAction = createAsyncThunk<void, string>(
  'user/to-friend',
  async (id) => {
    await userApi.toFriend(id);
});

export const removeFriendAction = createAsyncThunk<void, string>(
  'user/remove-coach-friend', 
  async (id) => {
    await userApi.removeFriend(id);
});

export const subscribeAction = createAsyncThunk<void, string>(
  'user/subscribe', 
  async (id) => {
    await userApi.subscribe(id);
});
