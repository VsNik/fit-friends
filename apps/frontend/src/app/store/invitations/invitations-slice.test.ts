import { LoadStatus } from "../../constants/common";
import { InvitesState } from "../../types/state-type";
import { UNKNOWN_ACTION, makeFakeInvitation, makeFakeInvitations } from "../../utils/mock-data";
import { changeInviteStatusAction, createInvitationAction, fetchFromInvitesAction } from "./async-action";
import { invitationsSlice } from "./invitations.slice";

describe('InvitesSlice test', () => {
  let state: InvitesState;

  beforeEach(() => {
    state = {
      invitations: [],
      loadStatus: LoadStatus.Never,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(invitationsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({invitations: [], loadStatus: LoadStatus.Never});
  });

  describe('createInvitationAction test', () => {
    it('should be update loadStatus to Loading if createInvitationAction pending', function () {
      expect(invitationsSlice.reducer(state, {type: createInvitationAction.pending.type}))
        .toEqual({invitations: [], loadStatus: LoadStatus.Loading})
    });

    it('should be update invitations if createInvitationAction fulfield', function () {
      const fakeInvitations = makeFakeInvitation();
      expect(invitationsSlice.reducer(state, {type: createInvitationAction.fulfilled.type, payload: fakeInvitations}))
        .toEqual({invitations: [fakeInvitations], loadStatus: LoadStatus.Loaded})
    });

    it('should be update loadStatus to Loaded if createInvitationAction rejected', function () {
      expect(invitationsSlice.reducer(state, {type: createInvitationAction.rejected.type}))
        .toEqual({invitations: [], loadStatus: LoadStatus.Loaded})
    });
  });

  describe('fetchFromInvitesAction test', () => {
    it('should be change loadStatus to Loading if fetchFromInvitesAction pending', function () {
      expect(invitationsSlice.reducer(state, {type: fetchFromInvitesAction.pending.type}))
        .toEqual({invitations: [], loadStatus: LoadStatus.Loading})
    });

    it('should be update invitations if fetchFromInvitesAction fulfilled', function () {
      const fakeInvitations = makeFakeInvitations();
      expect(invitationsSlice.reducer(state, {type: fetchFromInvitesAction.fulfilled.type, payload: fakeInvitations}))
        .toEqual({invitations: fakeInvitations, loadStatus: LoadStatus.Loaded})
    });

    it('should be change loadStatus to Loaded if fetchFromInvitesAction rejected', function () {
      expect(invitationsSlice.reducer(state, {type: fetchFromInvitesAction.rejected.type}))
        .toEqual({invitations: [], loadStatus: LoadStatus.Loaded})
    });
  });

  describe('changeInviteStatusAction test', () => {
    it('should be change loadStatus to Loading if changeInviteStatusAction pending', function () {
      expect(invitationsSlice.reducer(state, {type: changeInviteStatusAction.pending.type}))
        .toEqual({invitations: [], loadStatus: LoadStatus.Loading})
    });

    it('should be update invitations if changeInviteStatusAction fulfilled', function () {
      const invitations = makeFakeInvitations();
      const payload = invitations[1];
      state.invitations = invitations;

      expect(invitationsSlice.reducer(state, {type: changeInviteStatusAction.fulfilled.type, payload}))
        .toEqual({invitations: [state.invitations[0], payload], loadStatus: LoadStatus.Loaded})
    });

    it('should be change loadStatus to Loaded if changeInviteStatusAction rejected', function () {
      expect(invitationsSlice.reducer(state, {type: changeInviteStatusAction.rejected.type}))
        .toEqual({invitations: [], loadStatus: LoadStatus.Loaded})
    });
  })
});
