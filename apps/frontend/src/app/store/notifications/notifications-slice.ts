import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { fetchNotificationAction } from './async-actions';

const initialState: NotificationsState = {
  notifications: [],
  loadStatus: LoadStatus.Never,
};

export const notificationsSlice = createSlice({
  name: SliceName.Notifications,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchNotificationAction.fulfilled, (state, { payload }) => {
        state.loadStatus = LoadStatus.Loaded;
        state.notifications = payload;
      });
  },
});
