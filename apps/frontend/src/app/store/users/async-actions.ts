import { IUserCollection } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/user-api';

// Слайдер на главной
export const fetchCompanyAction = createAsyncThunk<IUserCollection>('users/fetch-for-company', async () => {
  const data = await userApi.fetchCompany();
  return data;
});
// Каталог пользователей
export const fetchUsersAction = createAsyncThunk<IUserCollection, string>('users/fetch-users', async (queryString) => {
  console.log(queryString);
  const data = await userApi.fetchUsers(queryString);
  return data;
});
// Друзья пользователя
export const fetchUserFriendsAction = createAsyncThunk<IUserCollection, string>('users/fetch-user-friends', async (id) => {
  const data = await userApi.fetchUserFriends();
  return data;
});
// друзья тренира
export const fetchCoachFriendsAction = createAsyncThunk<IUserCollection, string>('users/fetch-coach-friends', async (id) => {
  const data = await userApi.fetchUserFriends();
  return data;
});
