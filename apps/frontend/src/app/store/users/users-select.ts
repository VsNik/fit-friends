import { RootState } from "..";
import { SliceName } from "../../constants/common";

const all = (state: RootState) => state[SliceName.Users];

export const users = (state: RootState) => all(state).users;
export const isLoading = (state: RootState) => all(state).isLoading;
export const page = (state: RootState) => all(state).page;
export const total = (state: RootState) => all(state).total;
export const filter = (state: RootState) => all(state).filter;
export const sorting = (state: RootState) => all(state).sorting;
export const direction = (state: RootState) => all(state).direction;
