import { IAccessTokenPayload, IUser } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../../services/auth-api';
import { RouteName } from '../../constants/route';
import { AppDispatch, RootState } from '..';
import { redirectToRoute } from '../action';
import { LoginType, QuestionUserType } from '../../types/forms-type';
import { dropToken, getRefreshToken, saveToken } from '../../services/token';
import { AxiosError } from 'axios';
import { SliceName } from '../../constants/common';

export const loginAction = createAsyncThunk<
  IAccessTokenPayload,
  LoginType,
  {
    dispatch: AppDispatch;
  }
>('auth/login', async (authData, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await authApi.login(authData);
    const decoded: IAccessTokenPayload = jwtDecode(data.accessToken);
    saveToken(data);
    dispatch(redirectToRoute(RouteName.Home));
    return decoded;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data);
  }
});

export const signupAction = createAsyncThunk<IUser, FormData, { dispatch: AppDispatch }>(
  'auth/signup',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await authApi.signup(formData);
      dispatch(redirectToRoute(RouteName.Question));
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  },
);

export const createUserAction = createAsyncThunk<
  void,
  QuestionUserType,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('auth/create-user', async (userData, { dispatch, getState, rejectWithValue }) => {
  try {
    const state = getState();
    const userId = state[SliceName.Auth].authId;
    const { data } = await authApi.createUser(userId, userData);
    if (data.token) {
      saveToken(data.token);
    }
    dispatch(redirectToRoute(RouteName.Home));
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data);
  }
});

export const createCoachAction = createAsyncThunk<
  void,
  FormData,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('auth/create-coach', async (formData, { dispatch, getState, rejectWithValue }) => {
  try {
    const state = getState();
    const userId = state[SliceName.Auth].authId;
    const { data } = await authApi.createCoch(userId, formData);
    if (data.token) {
      saveToken(data.token);
    }
    dispatch(redirectToRoute(RouteName.Account));
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.response?.data);
  }
});

export const checkAuthAction = createAsyncThunk<IUser>(
  'auth/check-auth', 
  async (_arg, { rejectWithValue }) => {
    try {
      const { data } = await authApi.checkAuth();
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
  }
>(
  'auth/logout', 
  async (_arg, { dispatch }) => {
  const token = getRefreshToken();
    if (token) {
      await authApi.logout(token);
    }
    dropToken();
    dispatch(redirectToRoute(RouteName.Intro));
});
