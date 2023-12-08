import { IUserCollection } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/user-api';

export const fetchCompanyAction = createAsyncThunk<IUserCollection>(
  'users/fetch-for-company',
  async () => {
    const {data} = await userApi.fetchCompany();
    return data;
});

export const fetchUsersAction = createAsyncThunk<IUserCollection, string>('users/fetch-users', async (queryString) => {
  const {data} = await userApi.fetchUsers(queryString);
  console.log(queryString)
  return data;
});

export const fetchUserFriendsAction = createAsyncThunk<IUserCollection, string>(
  'users/more-user-friends', 
  async (id) => {
    const {data} = await userApi.fetchUserFriends();
    return data;
});

// export const loadMoreUserFriendsAction = createAsyncThunk<IUserCollection, string>('users/fetch-user-friends', async (id) => {
//   const {data} = await userApi.fetchUserFriends();
//   return data;
// });

export const fetchCoachFriendsAction = createAsyncThunk<IUserCollection, string>('users/fetch-coach-friends', async (queryString) => {
  const {data} = await userApi.fetchCoachFriends(queryString);
  return data;
});

export const loadMoreCoachFriendsAction = createAsyncThunk<IUserCollection, string>(
  'users/more-coach-friends', 
  async (queryString) => {
    const {data} = await userApi.fetchCoachFriends(queryString);
    return data;
});
