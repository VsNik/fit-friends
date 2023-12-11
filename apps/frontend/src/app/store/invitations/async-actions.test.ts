import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '..';
import api from '../../services/api';
import { MockData, makeFakeInvitations } from '../../utils/mock-data';
import { generatePath } from 'react-router-dom';
import { ApiInvite } from '../../constants/route';
import { changeInviteStatusAction, createInvitationAction, fetchFromInvitesAction } from './async-action';
import { InviteStatus } from '@fit-friends/shared';

describe('Invitations Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);
  const invitations = makeFakeInvitations();

  it('createInvitationAction test ', async () => {
    mockAPI
      .onPost(generatePath(ApiInvite.Invite, {id: MockData.Id}))
      .reply(200, invitations[0]);

    const store = mockStore();
    await store.dispatch(createInvitationAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createInvitationAction.pending.type,
      createInvitationAction.fulfilled.type,
    ]);
  });

  it('fetchFromInvitesAction test ', async () => {
    mockAPI
      .onGet(ApiInvite.Invites)
      .reply(200, invitations);

    const store = mockStore();
    await store.dispatch(fetchFromInvitesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFromInvitesAction.pending.type,
      fetchFromInvitesAction.fulfilled.type,
    ]);
  });

  it('changeInviteStatusAction test ', async () => {
    mockAPI
      .onPatch(generatePath(ApiInvite.Invite, {id: MockData.Id}))
      .reply(200, invitations);

    const store = mockStore();
    await store.dispatch(changeInviteStatusAction({invitationId: MockData.Id, status: InviteStatus.Accepted}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeInviteStatusAction.pending.type,
      changeInviteStatusAction.fulfilled.type,
    ]);
  });
});
