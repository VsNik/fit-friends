import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from '../../types/state-type';
import { SliceName } from '../../constants/common';
import { fetchNotificationAction } from './async-actions';

const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
};

export const notificationsSlice = createSlice({
  name: SliceName.Notifications,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotificationAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.notifications = payload;
      });
  },
});
