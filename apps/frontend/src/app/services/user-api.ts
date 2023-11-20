import { IUserCollection } from '@fit-friends/shared';
import { fakeCompanyUser, fakeUsers } from '../fake-data/fake-user';

export const userApi = {
  fetchCompany: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeCompanyUser), 500);
    });
  },

  fetchUsers: (queryString: string): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), 500);
    });
  },
};
