import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { checkAuthAction } from './async-actions';
import { AuthState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: AuthState = {
  authId: '',
  isAuth: false,
  loadStatus: LoadStatus.Never,
  error: '',
};

export const authSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = '';
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
      });
  },
});
