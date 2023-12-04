import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@fit-friends/shared';
import { fetchAuthAction, fetchUserAction, updateUserAction } from './async-actions';
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
      .addCase(fetchAuthAction.fulfilled, (state, {payload}) => {
        state.user = payload;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchUserAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchUserAction.fulfilled, (state, {payload}) => {
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
      });
  },
});
