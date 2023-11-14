import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { UserInfoType } from '../../components/forms/user-info-form/user-info-form';

export const updateUserAction = createAsyncThunk<
  UserInfoType,
  UserInfoType,
  {
    dispatch: AppDispatch;
  }
>('user/update', async (user, { dispatch, rejectWithValue }) => {
  try {
    console.log(user);
    return user;
  } catch (err) {
    return rejectWithValue(err);
  }
});
