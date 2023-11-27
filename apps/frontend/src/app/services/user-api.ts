import { IUser, IUserCollection } from '@fit-friends/shared';
import { fakeCompanyUser, fakeUsers, testUser } from '../fake-data/fake-user';
import { UserInfoType } from '../types/forms-type';

const TIMEOUT = 500;

export const userApi = {
  fetchAuth: (): Promise<IUser> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(testUser), TIMEOUT);
    });
  },

  fetchUser: (id: string): Promise<IUser> => {
    const user = fakeUsers.data.find((user) => user.id === id)!;
    return new Promise((resolve) => {
      setTimeout(() => resolve(user), TIMEOUT);
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
  },

  addCertificate: (id: string, formData: FormData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), TIMEOUT);
    });
  },

  updateCertificate: (id: string, src: string, formData: FormData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), TIMEOUT);
    });
  },

  deleteCertificate: (id: string, src: string): Promise<{ id: string; src: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id, src }), 1000);
    });
  }
};
