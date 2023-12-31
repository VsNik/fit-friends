import { RootState } from '..';
import { SliceName } from '../../constants/common';

export const all = (state: RootState) => state[SliceName.Auth];

export const authId = (state: RootState) => all(state).authId;
export const authRole = (state: RootState) => all(state).authRole;
export const isAuth = (state: RootState) => all(state).isAuth;
export const loadStatus = (state: RootState) => all(state).loadStatus;
export const isReady = (state: RootState) => all(state).isReady;
export const error = (state: RootState) => all(state).error;
