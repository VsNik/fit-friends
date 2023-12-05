import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/shared';
import {
  addCertificateAction,
  deleteCertificateAction,
  fetchAuthAction,
  fetchUserAction,
  removeFriendAction,
  subscribeAction,
  toFriendAction,
  updateCertificateAction,
  updateUserAction,
} from './async-actions';
import { UserState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: UserState = {
  user: {} as IUser,
  loadStatus: LoadStatus.Never,
  error: '',
};

export const userSlice = createSlice({
  name: SliceName.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchAuthAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchUserAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchUserAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(updateUserAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = '';
      })
      .addCase(updateUserAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(updateUserAction.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(addCertificateAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(addCertificateAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(updateCertificateAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(updateCertificateAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(deleteCertificateAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(deleteCertificateAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(toFriendAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(toFriendAction.fulfilled, (state) => {
        state.user.isFollow = !state.user.isFollow;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(removeFriendAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(removeFriendAction.fulfilled, (state) => {
        state.user.isFollow = false;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(subscribeAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(subscribeAction.fulfilled, (state) => {
        state.user.isSubscribe = !state.user.isSubscribe;
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});
