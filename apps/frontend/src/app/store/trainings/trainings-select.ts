import { RootState } from "..";
import { SliceName } from "../../constants/common";

const all = (state: RootState) => state[SliceName.Trainings];

export const trainings = (state: RootState) => all(state).trainings;
export const isLoading = (state: RootState) => all(state).isLoading;
export const page = (state: RootState) => all(state).page;
export const total = (state: RootState) => all(state).total;
export const filter = (state: RootState) => all(state).filter;
export const sorting = (state: RootState) => all(state).sorting;
export const sortStatistic = (state: RootState) => all(state).sortStatistic;
export const direction = (state: RootState) => all(state).direction;

export const trainingsForYou = (state: RootState) => state[SliceName.ForYou].trainings;
export const isLoadingForYou = (state: RootState) => state[SliceName.ForYou].isLoading;

export const trainingsSpecial = (state: RootState) => state[SliceName.Special].trainings;
export const isLoadingSpecial = (state: RootState) => state[SliceName.Special].isLoading;

export const trainingsPopular = (state: RootState) => state[SliceName.Popular].trainings;
export const isLoadingPopular = (state: RootState) => state[SliceName.Popular].isLoading;
