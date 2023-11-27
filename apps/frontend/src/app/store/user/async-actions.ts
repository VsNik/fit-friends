import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/shared';
import { userApi } from '../../services/user-api';
import { UserInfoType } from '../../types/forms-type';

// Авторизированный пользователь
export const fetchAuthAction = createAsyncThunk<IUser>('user/fetc-auth', async () => {
  const data = await userApi.fetchAuth();
  return data;
});
// Пользователь по ID
export const fetchUserAction = createAsyncThunk<IUser, string>('user/fetch-user', async (id, { rejectWithValue }) => {
  const data = await userApi.fetchUser(id);
  return data;
});
// Обновление пользователя
export const updateUserAction = createAsyncThunk<UserInfoType, UserInfoType>('user/update', async (user, { rejectWithValue }) => {
  try {
    const data = await userApi.updateUser(user);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// Загрузить сертификат
export const addCertificateAction = createAsyncThunk<unknown, { id: string; formData: FormData }>(
  'user/add-certificate',
  async ({ id, formData }) => {
    await userApi.addCertificate(id, formData);
  },
);
// Обновить сертификат
export const updateCertificateAction = createAsyncThunk<unknown, { id: string; src: string; formData: FormData }>(
  'user/update-certificate',
  async ({ id, src, formData }) => {
    await userApi.updateCertificate(id, src, formData);
  },
);
// Удалить сертификат
export const deleteSertificateAction = createAsyncThunk<unknown, { id: string; src: string }>(
  'user/delete-certificate', 
  async ({ id, src }) => {
    await userApi.deleteCertificate(id, src);
});
