import { IUser } from '@fit-friends/shared';
import { fakeCoach } from '../fake-data/fake-user';

const TIMEOUT = 500;

export const authApi = {
  signup: (formData: FormData): Promise<FormData> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(formData), TIMEOUT);
    })
  },

  checkAuth: (): Promise<IUser> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeCoach), TIMEOUT);
    });
  },
};
