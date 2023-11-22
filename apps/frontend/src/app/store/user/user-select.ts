import { RootState } from "..";
import { SliceName } from "../../constants/common";

const all = (state: RootState) => state[SliceName.User];

export const user = (state: RootState) => all(state).user;
export const isLoading = (state: RootState) => all(state).isLoading;