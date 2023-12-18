import { IAlertCollection } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationApi } from '../../services/notification-api';

export const fetchNotificationAction = createAsyncThunk<IAlertCollection>(
  'notify/fetch-alerts', 
  async () => {
    const {data} = await notificationApi.fetchAkert();
    return data;
  })
;

export const removeNotificationAction = createAsyncThunk<string, string>(
  'notify/remove-alert',
  async (id) => {
    await notificationApi.removeAlert(id);
    return id;
  }
);

export const sendNotificationAction = createAsyncThunk<void>(
  'notify/send-notify',
  async () => {
    await notificationApi.sendNotify();
  }
);
