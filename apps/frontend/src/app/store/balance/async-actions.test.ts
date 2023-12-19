import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import api from '../../services/api';
import { RootState } from '..';
import { Action } from '@reduxjs/toolkit';
import { MockData, makeFakeBalance } from '../../utils/mock-data';
import { generatePath } from 'react-router-dom';
import { ApiBalanceRoute } from '../../constants/route';
import { dismissionAction, fetchBalanceAction, setNoActiveAction } from './async-action';

describe('Balance Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);
  const mockBalance = makeFakeBalance();

  it('fetchBalanceAction test', async () => {
    mockAPI
        .onGet(generatePath(ApiBalanceRoute.ShowBalance, { id: MockData.Id }))
        .reply(200, mockBalance);

    const store = mockStore();
    await store.dispatch(fetchBalanceAction(MockData.Id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
        fetchBalanceAction.pending.type, 
        fetchBalanceAction.fulfilled.type
    ]);
  });

  it('dismissionAction test', async () => {
    mockAPI
        .onPatch(generatePath('/balance/:id/dismission', { id: MockData.Id }))
        .reply(200, mockBalance);

    const store = mockStore();
    await store.dispatch(dismissionAction(MockData.Id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
        dismissionAction.pending.type, 
        dismissionAction.fulfilled.type
    ]);
  });

  it('setNoActiveAction test', async () => {
    mockAPI
        .onPatch(generatePath('/balance/:id/no-active', { id: MockData.Id }))
        .reply(200, mockBalance);

    const store = mockStore();
    await store.dispatch(setNoActiveAction(MockData.Id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
        setNoActiveAction.pending.type, 
        setNoActiveAction.fulfilled.type
    ]);
  });
});
