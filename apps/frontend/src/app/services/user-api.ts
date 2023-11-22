import { IUser, IUserCollection } from '@fit-friends/shared';
import { fakeCoach, fakeCompanyUser, fakeUsers } from '../fake-data/fake-user';
import { UserInfoType } from '../components/forms/user-info-form/user-info-form';

export const userApi = {
  fetchUser: (): Promise<IUser> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeCoach), 500);
    });
  },

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

  updateUser: (user: UserInfoType): Promise<UserInfoType> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(user), 500);
    });
  }
};
