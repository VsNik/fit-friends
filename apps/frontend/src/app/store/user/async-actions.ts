import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfoType } from '../../components/forms/user-info-form/user-info-form';
import { IUser } from '@fit-friends/shared';
import { userApi } from '../../services/user-api';

export const fetchUserAction = createAsyncThunk<IUser>(
    'user/fetch-user',
    async () => {
        const data = await userApi.fetchUser();
        return data;
    }
)

export const updateUserAction = createAsyncThunk<
  UserInfoType,
  UserInfoType
>('user/update', async (user, { rejectWithValue }) => {
  try {
    const data = await userApi.updateUser(user);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
