import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { IUser, TrainingType } from '@fit-friends/shared';
import { fakeCoach } from '../../fake-data/fake-user';
import { updateUserAction } from './async-actions';

export interface UserStore {
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: UserStore = {
  user: fakeCoach,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAction.pending, (state) => {
        state.isLoading = true;
        state.user = {} as IUser;
        state.error = '';
      })
      .addCase(updateUserAction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = {...fakeCoach, 
          name: payload.name,
          bio: payload.bio,
          personalTraining: payload.personalTraining,
          location: payload.location,
          gender: payload.gender,
          trainingType: payload.trainingType as TrainingType[]
        };
      })
      .addCase(updateUserAction.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
