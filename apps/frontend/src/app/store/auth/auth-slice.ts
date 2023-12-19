import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { checkAuthAction, createCoachAction, createUserAction, loginAction, logoutAction, signupAction } from './async-actions';
import { AuthState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: AuthState = {
  authId: '',
  isAuth: false,
  loadStatus: LoadStatus.Never,
  isReady: false,
  error: null,
};

export const authSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.authId = payload.id;
        state.authRole = payload.role;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action: AnyAction) => {
        state.isAuth = false;
        state.error = action.payload;
      })

      .addCase(signupAction.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.authId = payload.id;
        state.authRole = payload.role;
        state.isReady = true;
        state.error = null;
      })
      .addCase(signupAction.rejected, (state, action: AnyAction) => {
        state.isAuth = false;
        state.error = action.payload;
      })

      .addCase(createUserAction.fulfilled, (state, { payload }) => {
        state.isReady = false;
        state.error = null;
      })
      .addCase(createUserAction.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
      })

      .addCase(createCoachAction.fulfilled, (state) => {
        state.isReady = false;
        state.error = null;
      })
      .addCase(createCoachAction.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
      })

      .addCase(checkAuthAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.authId = payload.id;
        state.authRole = payload.role;
        state.isAuth = true;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(checkAuthAction.rejected, (state, action: AnyAction) => {
        state.isAuth = false;
        state.error = action.payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(logoutAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loadStatus = LoadStatus.Loaded;
        state.isAuth = false;
        state.authId = '';
        state.authRole = undefined;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
