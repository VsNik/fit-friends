import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Balance];

export const balance = (state: RootState) => all(state).balanc;
export const loadStatus = (state: RootState) => all(state).loadStatus;
