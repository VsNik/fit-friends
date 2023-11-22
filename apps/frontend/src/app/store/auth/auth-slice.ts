import { Role } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fakeCoach } from '../../fake-data/fake-user';
import { addCertificateAction, deleteSertificateAction, updateCertificateAction } from './async-actions';
import { AuthState } from '../../types/state-type';
import { SliceName } from '../../constants/common';

const initialState: AuthState = {
  authUser: {...fakeCoach, role: Role.User},
  isAuth: true,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: SliceName.Auth,
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
