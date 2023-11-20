import { IUserCollection } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/user-api';

export const fetchCompanyAction = createAsyncThunk<IUserCollection>(
  'users/fetch-for-company', 
  async () => {
    const data = await userApi.fetchCompany();
    return data;
});

export const fetchUsersAction = createAsyncThunk<IUserCollection, string>(
  'users/fetch-users',
  async (queryString) => {
    console.log(queryString);
    const data = await userApi.fetchUsers(queryString);
    return data;
  }
)
