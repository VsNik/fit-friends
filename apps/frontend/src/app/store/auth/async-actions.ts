import { IUser } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/auth-api';

const addCertificate = (id: string, certificate: File): Promise<{ id: string; certificate: File }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, certificate }), 1000);
  });
};

const updateCertificate = (id: string, src: string, certificate: File): Promise<{ id: string; src: string; certificate: File }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, src, certificate }), 1000);
  });
};

const deleteCertificate = (id: string, src: string): Promise<{ id: string; src: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, src }), 1000);
  });
};

export const checkAuthAction = createAsyncThunk<IUser>(
  'auth/check-auth', 
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.checkAuth();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
});

export const addCertificateAction = createAsyncThunk<unknown, { id: string; certificate: File }>(
  'auth/add-certificate',
  async ({ id, certificate }) => {
    const data = await addCertificate(id, certificate);
    console.log(data);
  },
);

export const updateCertificateAction = createAsyncThunk<unknown, { id: string; src: string; certificate: File }>(
  'auth/update-certificate',
  async ({ id, src, certificate }) => {
    const data = await updateCertificate(id, src, certificate);
    console.log(data);
  },
);

export const deleteSertificateAction = createAsyncThunk<unknown, { id: string; src: string }>('auth/delete-certificate', async ({ id, src }) => {
  await deleteCertificate(id, src);
  console.log('deleted');
});
