import { RootState } from "..";
import { SliceName } from "../../constants/common";

const all = (state: RootState) => state[SliceName.Notifications];

export const notifications = (state: RootState) => all(state).notifications;
export const loadStatus = (state: RootState) => all(state).loadStatus;