import { IUser, Role } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/auth-api';
import { RouteName } from '../../constants/route';
import { AppDispatch } from '..';
import { redirectToRoute } from '../action';

export const signupAction = createAsyncThunk<Role, FormData, { dispatch: AppDispatch }>('auth/signup', async (formData, { dispatch }) => {
  const data = await authApi.signup(formData);
  if (formData.get('role') === Role.User) {
    dispatch(redirectToRoute(RouteName.QuestionUser));
  } else {
    dispatch(redirectToRoute(RouteName.QuestionCoach));
  }
  return data.get('role') as Role;
});

export const checkAuthAction = createAsyncThunk<IUser>('auth/check-auth', async (_, { rejectWithValue }) => {
  try {
    const data = await authApi.checkAuth();
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
