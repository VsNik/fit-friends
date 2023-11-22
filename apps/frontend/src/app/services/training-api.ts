import { ITrainingCollection } from '@fit-friends/shared';
import { fakeForYouTrainings, fakePopularTraining, fakeSpecialTrainings, getFakeTrainings } from '../fake-data/fake-training';

export const trainingApi = {
  fetchTrainings: (count: number): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getFakeTrainings(count)), 500);
    });
  },

  fetchForYou: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeForYouTrainings), 500);
    });
  },

  fetchSpecial: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeSpecialTrainings));
    });
  },

  fetchPopular: (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakePopularTraining));
    });
  },

  fetchForCoach: (): Promise<ITrainingCollection> => {
    return new Promise((resolce) => {
      setTimeout(() => resolce(getFakeTrainings(8)), 500)
    })
  }
};
