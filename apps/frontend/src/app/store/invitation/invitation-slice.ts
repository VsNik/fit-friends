import { createSlice } from '@reduxjs/toolkit';
import { InviteState } from '../../types/state-type';
import {IInvitation} from '@fit-friends/shared';
import { LoadStatus, SliceName } from '../../constants/common';

const initialState: InviteState = {
    invitation: {} as IInvitation,
    loadStatus: LoadStatus.Never,
}

export const invitationSlice = createSlice({
    name: SliceName.Invite,
    initialState,
    reducers: {},
})