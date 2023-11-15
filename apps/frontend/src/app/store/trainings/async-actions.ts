import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrainingCollection } from "@fit-friends/shared";
import { fakeForYouTrainings, fakePopularTraining, fakeSpecialTrainings } from "../../fake-data/fake-training";

const fetchForYou = (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakeForYouTrainings), 1000)
    });
}

const fetchSpecial = (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakeSpecialTrainings))
    });
}

const fetchPopular = (): Promise<ITrainingCollection> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakePopularTraining))
    });
}

export const fetchForYouAction = createAsyncThunk<ITrainingCollection>(
    'trainings/fetch-for-you',
    async () => {
        const data = await fetchForYou();
        return data;
    }
)

export const fetchSpecialAction = createAsyncThunk<ITrainingCollection>(
    'trainings/fetch-special',
    async () => {
        const data = await fetchSpecial();
        return data;
    }
)

export const fetchPopularAction = createAsyncThunk<ITrainingCollection>(
    'trainings/fetch-popular',
    async () => {
        const data = await fetchPopular();
        return data;
    }
)
