import { IUser, IUserCollection } from '@fit-friends/shared';
import { fakeCoach, fakeCompanyUser, fakeUsers } from '../fake-data/fake-user';
import { UserInfoType } from '../components/forms/user-info-form/user-info-form';

const TIMEOUT = 500;

export const userApi = {
  fetchUser: (): Promise<IUser> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeCoach), TIMEOUT);
    });
  },

  fetchCompany: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeCompanyUser), TIMEOUT);
    });
  },

  fetchUsers: (queryString: string): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), TIMEOUT);
    });
  },

  fetchUserFriends: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), TIMEOUT);
    });
  },

  fetchCoachFriends: (): Promise<IUserCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeUsers), TIMEOUT);
    });
  },

  updateUser: (user: UserInfoType): Promise<UserInfoType> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(user), TIMEOUT);
    });
  }
};
