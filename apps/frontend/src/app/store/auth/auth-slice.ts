import { IUser, Role } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fakeCoach } from '../../fake-data/fake-user';
import { addCertificateAction, deleteSertificateAction, updateCertificateAction } from './async-actions';

export interface AuthState {
  authUser: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  authUser: {...fakeCoach, role: Role.User},
  isAuth: true,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default authSlice.reducer;
