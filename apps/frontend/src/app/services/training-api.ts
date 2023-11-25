import { ITraining, ITrainingCollection } from '@fit-friends/shared';
import { fakeForYouTrainings, fakeOrderTraining, fakePopularTraining, fakeSpecialTrainings, getFakeTrainings } from '../fake-data/fake-training';

const TIMEOUT = 500;

export const trainingApi = {
  fetchTraining: (): Promise<ITraining> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getFakeTrainings(1).data[0]), TIMEOUT)
    })
  },

  fetchTrainings: (count: number): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getFakeTrainings(count)), TIMEOUT);
    });
  },

  fetchForYou: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeForYouTrainings), TIMEOUT);
    });
  },

  fetchSpecial: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeSpecialTrainings), TIMEOUT);
    });
  },

  fetchPopular: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakePopularTraining), TIMEOUT);
    });
  },

  fetchForCoach: (): Promise<ITrainingCollection> => {
    return new Promise((resolce) => {
      setTimeout(() => resolce(getFakeTrainings(8)), TIMEOUT);
    })
  },

  fetchOrderTraining: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeOrderTraining), TIMEOUT);
    })
  }
};
