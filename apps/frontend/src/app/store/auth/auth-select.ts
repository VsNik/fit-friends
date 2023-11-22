import { RootState } from "..";
import { SliceName } from "../../constants/common";

export const all = (state: RootState) => state[SliceName.Auth];

export const authUser = (state: RootState) => all(state).authUser;
export const isAuth = (state: RootState) => all(state).isAuth;
export const isLoading = (state: RootState) => all(state).isLoading;
