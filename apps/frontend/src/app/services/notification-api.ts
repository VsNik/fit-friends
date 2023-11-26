import { IAlert } from '@fit-friends/shared';
import { fakeNotifications } from '../fake-data/fake-notification';

const INTERVAL = 500;

export const notificationApi = {
  fetchNotification: (): Promise<IAlert[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeNotifications), INTERVAL);
    });
  },
};
