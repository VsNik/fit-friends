import { createSlice } from '@reduxjs/toolkit';
import { NotificationsState } from '../../types/state-type';
import { SliceName } from '../../constants/common';

const initialState: NotificationsState = {
  notifications: [],
  isLoading: false,
};

export const notificationsSlice = createSlice({
  name: SliceName.Notifications,
  initialState,
  reducers: {},
});

export default notificationsSlice.reducer;
