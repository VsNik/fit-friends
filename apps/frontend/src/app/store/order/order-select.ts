import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Order];

export const order = (state: RootState) => all(state).order;
export const isLoading = (state: RootState) => all(state).isLoading;
