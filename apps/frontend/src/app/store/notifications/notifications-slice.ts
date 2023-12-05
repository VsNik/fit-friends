import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { fetchNotificationAction } from './async-actions';

const initialState: NotificationsState = {
  notifications: [],
  page: 1,
  total: 0,
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
        state.notifications = payload.data;
        state.page = payload.page;
        state.total = payload.total;
      });
  },
});
