import { Location, SortDirection, TrainingType } from '@fit-friends/shared';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCoachFriendsAction, fetchCompanyAction, fetchUserFriendsAction, fetchUsersAction } from './async-actions';
import { UsersState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';

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
  loadStatus: LoadStatus.Never,
  error: '',
};

export const usersSlice = createSlice({
  name: SliceName.Users,
  initialState,
  reducers: {
    setLocationAction: (state, { payload }) => {
      if (state.filter.location?.includes(payload)) {
        state.filter.location = state.filter.location.filter((item) => item !== payload);
      } else {
        state.filter.location?.push(payload);
      }
    },
    setTypeAction: (state, {payload}) => {
      if (state.filter.types?.includes(payload)) {
        state.filter.types = state.filter.types.filter((item) => item !== payload);
      } else {
        state.filter.types?.push(payload);
      }
    },
    setAllLocationsAction: (state) => {
      const locations = Object.values(Location).map((item) => item);
      state.filter.location = state.filter.location.length !== locations.length ? locations : [];         
    },
    setAllTypesAction: (state) => {
      const types = Object.values(TrainingType).map((item) => item);
      state.filter.types = state.filter.types.length !== types.length ? types : [];
    }, 
    setLevelAction: (state, { payload }) => {
      state.filter.level = payload;
    },
    setSortingAction: (state, { payload }) => {
      state.sorting = payload;
    },
    setDirectionAction: (state, {payload}) => {
      state.direction = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.users = [];
      })
      .addCase(fetchUsersAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchCompanyAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.users = [];
        state.error = '';
      })
      .addCase(fetchCompanyAction.fulfilled, (state, { payload }) => {
        state.users = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchUserFriendsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.users = [];
      })
      .addCase(fetchUserFriendsAction.fulfilled, (state, {payload}) => {
        state.users = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchCoachFriendsAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
        state.users = [];
      })
      .addCase(fetchCoachFriendsAction.fulfilled, (state, {payload}) => {
        state.users = payload.data;
        state.page = payload.page;
        state.total = payload.total;
        state.loadStatus = LoadStatus.Loaded;
      })
  },
});

export const {
  setLocationAction, 
  setTypeAction, 
  setLevelAction, 
  setSortingAction, 
  setDirectionAction, 
  setAllLocationsAction, 
  setAllTypesAction
} = usersSlice.actions;
