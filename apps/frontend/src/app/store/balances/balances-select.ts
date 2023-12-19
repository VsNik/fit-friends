import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Balances];

export const balances = (state: RootState) => all(state).balances;
export const loadStatus = (state: RootState) => all(state).loadStatus;
export const page = (state: RootState) => all(state).page;
export const total = (state: RootState) => all(state).total;
export const filter = (state: RootState) => all(state).filter;
