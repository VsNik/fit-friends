import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus, SliceName } from '../../constants/common';
import { fetchNotificationAction, removeNotificationAction, sendNotificationAction } from './async-actions';

const initialState: NotificationsState = {
  notifications: [],
  page: DefaultPaginate.Page,
  total: DefaultPaginate.Total,
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
      })
      .addCase(fetchNotificationAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(removeNotificationAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(removeNotificationAction.fulfilled, (state, { payload }) => {
        const index = state.notifications.findIndex((item) => item.id === payload);
        state.notifications.splice(index, 1);
        state.total = state.notifications.length;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(removeNotificationAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(sendNotificationAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(sendNotificationAction.fulfilled, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
