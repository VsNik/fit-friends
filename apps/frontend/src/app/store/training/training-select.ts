import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Training];

export const training = (state: RootState) => all(state).training;
export const loadStatus = (state: RootState) => all(state).loadStatus;
export const error = (state: RootState) => all(state).error;
