import { RootState } from "..";
import { SliceName } from "../../constants/common";

export const all = (state: RootState) => state[SliceName.Auth];

export const authId = (state: RootState) => all(state).authId;
export const authRole = (state: RootState) => all(state).authRole;
export const isAuth = (state: RootState) => all(state).isAuth;
export const loadStatus = (state: RootState) => all(state).loadStatus;
