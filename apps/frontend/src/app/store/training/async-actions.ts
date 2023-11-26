import { ITraining } from "@fit-friends/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { trainingApi } from "../../services/training-api";

export const fetchTrainingAction = createAsyncThunk<ITraining, string>(
    'training/fetch-training',
    async (id) => {
        const data = await trainingApi.fetchTraining();
        return data;
    }
)

export const createTrainingAction = createAsyncThunk<unknown, FormData>(
    'training/create-training',
    async (formData) => {
        const data = await trainingApi.createTraining(formData);
        console.log(data);
    }
  )