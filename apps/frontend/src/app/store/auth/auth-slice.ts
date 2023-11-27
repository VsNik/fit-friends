import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { addCertificateAction, checkAuthAction, deleteSertificateAction, updateCertificateAction } from './async-actions';
import { AuthState } from '../../types/state-type';
import { SliceName } from '../../constants/common';
// import { IUser } from '@fit-friends/shared';

const initialState: AuthState = {
  // authUser: {} as IUser,
  authId: '',
  // authRole: null,
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
      .addCase(checkAuthAction.fulfilled, (state, {payload}) => {
        // state.authUser = payload;
        state.authId = payload.id;
        state.authRole = payload.role;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state, action: AnyAction) => {
        // state.authUser = {} as IUser;
        state.isAuth = false;
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(addCertificateAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCertificateAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(updateCertificateAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCertificateAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteSertificateAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSertificateAction.fulfilled, (state) => {
        state.isLoading = false;
      })
  }
});
