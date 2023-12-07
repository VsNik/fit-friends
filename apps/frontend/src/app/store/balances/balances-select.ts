import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Balances];

export const balances = (state: RootState) => all(state).balances;
export const loadStatus = (state: RootState) => all(state).loadStatus;