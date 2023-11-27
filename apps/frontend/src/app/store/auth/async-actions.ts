import { IUser, Role } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/auth-api';
import { history } from '../../utils/history';
import { RouteName } from '../../constants/route';

export const signupAction = createAsyncThunk<unknown, FormData>(
  'auth/signup',
  async (formData) => {
    if (formData.get('role') === Role.User) {
      return history.navigate(RouteName.QuestionUser)
    }
    return history.navigate(RouteName.QuestionCoach);
  }
);

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
