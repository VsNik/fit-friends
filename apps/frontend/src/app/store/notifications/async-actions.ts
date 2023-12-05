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
