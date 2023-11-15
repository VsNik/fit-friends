import { IUser } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyAction } from './async-actions';

export interface UsersState {
  users: IUser[];
  page: number;
  total: number;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  page: 1,
  total: 50,
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyAction.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchCompanyAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      });
  },
});

export default usersSlice.reducer;
