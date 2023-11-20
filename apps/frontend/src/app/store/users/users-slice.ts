import { IUser, Role, SortDirection, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyAction, fetchUsersAction } from './async-actions';

export interface UsersFilter {
  location: Location[];
  type: TrainingType[];
  level: TrainingLevel | '';
}

export interface UsersState {
  users: IUser[];
  filter: UsersFilter;
  sorting: Role | null;
  direction: SortDirection;
  page: number;
  total: number;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  filter: {
    location: [],
    type: [],
    level: '',
  },
  sorting: null,
  direction: SortDirection.Desc,
  page: 1,
  total: 50,
  isLoading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLocation: (state, { payload }) => {
      if (state.filter.location?.includes(payload)) {
        state.filter.location = state.filter.location.filter((item) => item !== payload);
      } else {
        state.filter.location?.push(payload);
      }
    },
    setType: (state, { payload }) => {
      if (state.filter.type?.includes(payload)) {
        state.filter.type = state.filter.type.filter((item) => item !== payload);
      } else {
        state.filter.type?.push(payload);
      }
    },
    setLevel: (state, { payload }) => {
      state.filter.level = payload;
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.isLoading = false;
      })

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
