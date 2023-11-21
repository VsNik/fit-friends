import { IUser, Role, SortDirection, TrainingLevel, TrainingType, Location } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyAction, fetchUsersAction } from './async-actions';

export interface UsersFilters {
  location: Location[];
  types?: TrainingType[];
  level: TrainingLevel | '';
}

export interface UsersState {
  users: IUser[];
  filter: UsersFilters;
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
    types: [],
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
      if (state.filter.types?.includes(payload)) {
        state.filter.types = state.filter.types.filter((item) => item !== payload);
      } else {
        state.filter.types?.push(payload);
      }
    },
    setLevel: (state, { payload }) => {
      state.filter.level = payload;
    },
    setSorting: (state, { payload }) => {
      state.sorting = payload;
    },
    setDirection: (state, {payload}) => {
      state.direction = payload;
    }
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
export const {setLocation, setType, setLevel, setSorting, setDirection} = usersSlice.actions;
