import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { IUser, TrainingType } from '@fit-friends/shared';
import { fakeCoach } from '../../fake-data/fake-user';
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
        state.user = {...fakeCoach, 
          name: payload.name,
          bio: payload.bio,
          personalTraining: payload.personalTraining,
          location: payload.location,
          gender: payload.gender,
          trainingType: payload.trainingType as TrainingType[]
        };
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(updateUserAction.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
