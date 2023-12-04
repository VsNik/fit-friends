import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/shared';
import { userApi } from '../../services/user-api';
import { authApi } from '../../services/auth-api';

export const fetchAuthAction = createAsyncThunk<IUser>('user/fetc-auth', async () => {
  const {data} = await authApi.checkAuth();
  return data;
});

export const fetchUserAction = createAsyncThunk<IUser, string>('user/fetch-user', async (id, { rejectWithValue }) => {
  const data = await userApi.fetchUser(id);
  return data;
});

export const updateUserAction = createAsyncThunk<IUser, FormData>('user/update', async (formData, { rejectWithValue }) => {
  try {
    const {data} = await userApi.updateUser(formData);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const addCertificateAction = createAsyncThunk<unknown, { id: string; formData: FormData }>(
  'user/add-certificate',
  async ({ id, formData }) => {
    await userApi.addCertificate(id, formData);
  },
);

export const updateCertificateAction = createAsyncThunk<unknown, { id: string; src: string; formData: FormData }>(
  'user/update-certificate',
  async ({ id, src, formData }) => {
    await userApi.updateCertificate(id, src, formData);
  },
);

export const deleteSertificateAction = createAsyncThunk<unknown, { id: string; src: string }>('user/delete-certificate', async ({ id, src }) => {
  await userApi.deleteCertificate(id, src);
});
