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
  error: null,
};

export const userSlice = createSlice({
  name: SliceName.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(fetchAuthAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchAuthAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchUserAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(fetchUserAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchUserAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(updateUserAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
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
        state.error = null;
      })
      .addCase(addCertificateAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(addCertificateAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(updateCertificateAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(updateCertificateAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(updateCertificateAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(deleteCertificateAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(deleteCertificateAction.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(deleteCertificateAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(toFriendAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(toFriendAction.fulfilled, (state) => {
        state.user.isFollow = !state.user.isFollow;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(toFriendAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(removeFriendAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(removeFriendAction.fulfilled, (state) => {
        state.user.isFollow = false;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(removeFriendAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(subscribeAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.error = null;
      })
      .addCase(subscribeAction.fulfilled, (state) => {
        state.user.isSubscribe = !state.user.isSubscribe;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(subscribeAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});
