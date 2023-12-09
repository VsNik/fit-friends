import { createSlice } from '@reduxjs/toolkit';
import { InvitesState } from '../../types/state-type';
import { LoadStatus, SliceName } from '../../constants/common';
import { changeInviteStatusAction, createInvitationAction, fetchFromInvitesAction } from './async-action';

const initialState: InvitesState = {
  invitations: [],
  loadStatus: LoadStatus.Never,
};

export const invitationsSlice = createSlice({
  name: SliceName.Invites,
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(createInvitationAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(createInvitationAction.fulfilled, (state, {payload}) => {
        state.invitations.push(payload);
        state.loadStatus = LoadStatus.Loaded;        
      })
      .addCase(createInvitationAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(fetchFromInvitesAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(fetchFromInvitesAction.fulfilled, (state, { payload }) => {
        state.invitations = payload;
        state.loadStatus = LoadStatus.Loaded;
      })
      .addCase(fetchFromInvitesAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      })

      .addCase(changeInviteStatusAction.pending, (state) => {
        state.loadStatus = LoadStatus.Loading;
      })
      .addCase(changeInviteStatusAction.fulfilled, (state, {payload}) => {
        const index = state.invitations.findIndex((item) => item.id === payload.id);
        state.invitations[index] = payload;
        state.loadStatus = LoadStatus.Loaded;        
      })
      .addCase(changeInviteStatusAction.rejected, (state) => {
        state.loadStatus = LoadStatus.Loaded;
      });
  },
});
