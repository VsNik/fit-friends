import { RootState } from "..";
import { SliceName } from "../../constants/common";

const all = (state: RootState) => state[SliceName.User];

export const user = (state: RootState) => all(state).user;
export const loadStatus = (state: RootState) => all(state).loadStatus;
export const error = (state: RootState) => all(state).error;