import { IAlertCollection } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationApi } from '../../services/notification-api';

export const fetchNotificationAction = createAsyncThunk<IAlertCollection>(
  'notify/fetch-notifications', 
  async () => {
    const {data} = await notificationApi.fetchNotification();
    return data;
  })
;

export const removeNotificationAction = createAsyncThunk<string, string>(
  'notify/remove-notify',
  async (id) => {
    await notificationApi.removeNorification(id);
    return id;
  }
)
