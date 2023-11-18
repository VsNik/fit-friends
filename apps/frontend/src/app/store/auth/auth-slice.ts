import { IUser, Role } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fakeCoach } from '../../fake-data/fake-user';

export interface AuthState {
  authUser: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  authUser: {...fakeCoach, role: Role.User},
  isAuth: true,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
