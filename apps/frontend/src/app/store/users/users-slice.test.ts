import { UserSorting } from '@fit-friends/shared';
import { UsersState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeUserCollection, mockUsersFilter } from '../../utils/mock-data';
import { DefaultPaginate, LoadStatus } from '../../constants/common';
import {
  fetchUsersAction,
  loadMoreUsersAction,
  fetchCompanyAction,
  fetchUserFriendsAction,
  loadMoreUserFriendsAction,
  fetchCoachFriendsAction,
  loadMoreCoachFriendsAction,
} from './async-actions';
import { usersSlice } from './users-slice';

describe('usersSlice test', () => {
  let state: UsersState;

  beforeEach(() => {
    state = {
      users: [],
      filter: mockUsersFilter,
      sorting: UserSorting.Created,
      direction: null,
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      loadStatus: LoadStatus.Never,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(usersSlice.reducer(undefined, { type: UNKNOWN_ACTION })).toEqual({
      users: [],
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      filter: mockUsersFilter,
      sorting: UserSorting.Created,
      direction: null,
      loadStatus: LoadStatus.Never,
      error: null,
    });
  });

  describe('fetchUsersAction test', () => {
    it('should be change loadStatus to Loading if fetchAuthAction pending', function () {
      expect(usersSlice.reducer(state, { type: fetchUsersAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be update users if fetchAuthAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      expect(usersSlice.reducer(state, { type: fetchUsersAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: fakeUsers.data,
        page: fakeUsers.page,
        total: fakeUsers.total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if fetchAuthAction rejected', function () {
      expect(usersSlice.reducer(state, { type: fetchUsersAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });

  describe('loadMoreUsersAction', () => {
    it('should be change loadStatus to Loading if loadMoreUsersAction pending', function () {
      expect(usersSlice.reducer(state, { type: loadMoreUsersAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be add users to exist users array if loadMoreUsersAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      state.users = fakeUsers.data;
      expect(usersSlice.reducer(state, { type: loadMoreUsersAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: [...state.users, ...fakeUsers.data],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if loadMoreUsersAction rejected', function () {
      expect(usersSlice.reducer(state, { type: loadMoreUsersAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });

  describe('fetchCompanyAction', () => {
    it('should be change loadStatus to Loading if fetchCompanyAction pending', function () {
      expect(usersSlice.reducer(state, { type: fetchCompanyAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be update users if fetchCompanyAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      expect(usersSlice.reducer(state, { type: fetchCompanyAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: fakeUsers.data,
        page: fakeUsers.page,
        total: fakeUsers.total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if fetchCompanyAction rejected', function () {
      expect(usersSlice.reducer(state, { type: fetchCompanyAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });

  describe('fetchUserFriendsAction', () => {
    it('should be change loadStatus to Loading if fetchUserFriendsAction pending', function () {
      expect(usersSlice.reducer(state, { type: fetchUserFriendsAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be update users to Loading if fetchUserFriendsAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      expect(usersSlice.reducer(state, { type: fetchUserFriendsAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: fakeUsers.data,
        page: fakeUsers.page,
        total: fakeUsers.total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if fetchUserFriendsAction rejected', function () {
      expect(usersSlice.reducer(state, { type: fetchUserFriendsAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });

  describe('loadMoreUserFriendsAction', () => {
    it('should be change loadStatus to Loading if loadMoreUserFriendsAction pending', function () {
      expect(usersSlice.reducer(state, { type: loadMoreUserFriendsAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be add users to exist users array if loadMoreUserFriendsAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      state.users = fakeUsers.data;
      expect(usersSlice.reducer(state, { type: loadMoreUserFriendsAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: [...state.users, ...fakeUsers.data],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if loadMoreUserFriendsAction rejected', function () {
      expect(usersSlice.reducer(state, { type: loadMoreUserFriendsAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });

  describe('fetchCoachFriendsAction test', () => {
    it('should be change loadStatus to Loading if fetchCoachFriendsAction pending', function () {
      expect(usersSlice.reducer(state, { type: fetchCoachFriendsAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be update users to Loading if fetchCoachFriendsAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      expect(usersSlice.reducer(state, { type: fetchCoachFriendsAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: fakeUsers.data,
        page: fakeUsers.page,
        total: fakeUsers.total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if fetchCoachFriendsAction rejected', function () {
      expect(usersSlice.reducer(state, { type: fetchCoachFriendsAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });

  describe('loadMoreCoachFriendsAction test', function () {
    it('should be change loadStatus to Loading if loadMoreCoachFriendsAction pending', function () {
      expect(usersSlice.reducer(state, { type: loadMoreCoachFriendsAction.pending.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loading,
        error: null,
      });
    });

    it('should be add users to exist users array if loadMoreCoachFriendsAction fulfilled', function () {
      const fakeUsers = makeFakeUserCollection();
      state.users = fakeUsers.data;
      expect(usersSlice.reducer(state, { type: loadMoreCoachFriendsAction.fulfilled.type, payload: fakeUsers })).toEqual({
        users: [...state.users, ...fakeUsers.data],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });

    it('should be change loadStatus to Loaded if loadMoreCoachFriendsAction rejected', function () {
      expect(usersSlice.reducer(state, { type: loadMoreCoachFriendsAction.rejected.type })).toEqual({
        users: [],
        page: DefaultPaginate.Page,
        total: DefaultPaginate.Total,
        filter: mockUsersFilter,
        sorting: UserSorting.Created,
        direction: null,
        loadStatus: LoadStatus.Loaded,
        error: null,
      });
    });
  });
});
