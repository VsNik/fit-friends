import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/shared';
import { userApi } from '../../services/user-api';
import { UserInfoType } from '../../types/forms-type';

// Авторизированный пользователь
export const fetchAuthAction = createAsyncThunk<IUser>('user/fetc-auth', async () => {
  const data = await userApi.fetchUser();
  return data;
});
// Пользователь по ID
export const fetchUserAction = createAsyncThunk<IUser>('user/fetch-user', async () => {
  const data = await userApi.fetchUser();
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
