import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrainingCollection } from '@fit-friends/shared';
import { fakeForYouTrainings, fakePopularTraining, fakeSpecialTrainings, getFakeTrainings } from '../../fake-data/fake-training';

const fetchTrainings = (count: number): Promise<ITrainingCollection> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getFakeTrainings(count)), 500);
  });
};

const fetchForYou = (): Promise<ITrainingCollection> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeForYouTrainings), 500);
  });
};

const fetchSpecial = (): Promise<ITrainingCollection> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeSpecialTrainings));
  });
};

const fetchPopular = (): Promise<ITrainingCollection> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakePopularTraining));
  });
};

export const fetchTrainingsAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-trainings', async () => {
  const data = await fetchTrainings(12);
  return data;
});

export const fetchForYouAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-for-you', async () => {
  const data = await fetchForYou();
  return data;
});

export const fetchSpecialAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-special', async () => {
  const data = await fetchSpecial();
  return data;
});

export const fetchPopularAction = createAsyncThunk<ITrainingCollection>('trainings/fetch-popular', async () => {
  const data = await fetchPopular();
  return data;
});
