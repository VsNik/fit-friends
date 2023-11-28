import { RootState } from "..";
import { SliceName } from "../../constants/common";

const all = (state: RootState) => state[SliceName.Reviews];

export const reviews = (state: RootState) => all(state).reviews;
export const loadStatus = (state: RootState) => all(state).loadStatus;