import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { checkAuthAction } from './async-actions';
import { AuthState } from '../../types/state-type';
import { SliceName } from '../../constants/common';

const initialState: AuthState = {
  authId: '',
  isAuth: false,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
        state.authId = payload.id;
        state.authRole = payload.role;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state, action: AnyAction) => {
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});
