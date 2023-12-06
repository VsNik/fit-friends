import { RootState } from '..';
import { SliceName } from '../../constants/common';

const all = (state: RootState) => state[SliceName.Invites];

export const invitations = (state: RootState) => all(state).invitations;
export const loadstatus = (state: RootState) => all(state).loadStatus;
