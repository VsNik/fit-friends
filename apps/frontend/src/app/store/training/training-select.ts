import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Training];

export const training = (state: RootState) => all(state).training;
export const isLoading = (state: RootState) => all(state).isLoading;
