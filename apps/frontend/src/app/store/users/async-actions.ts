import { IUserCollection } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fakeCompanyUser } from '../../fake-data/fake-user';

const companyUsers = (): Promise<IUserCollection> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeCompanyUser), 500);
  });
};

export const fetchCompanyAction = createAsyncThunk<IUserCollection>(
  'users/fetch-for-company', 
  async () => {
    const data = await companyUsers();
    return data;
});
