import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {MockData, makeFakeBalanceCollection} from "../../utils/mock-data";
import {generatePath} from "react-router";
import {ApiBalanceRoute} from "../../constants/route";
import {fetchPurchasesAction, loadMorePurchasesAction} from "./async-actions";

describe('Balance Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);
  const mockBalanceCollection = makeFakeBalanceCollection();

  it('fetchPurchasesAction', async () => {
    mockAPI
      .onGet(`${generatePath(ApiBalanceRoute.All)}${MockData.QueryString}`)
      .reply(200, mockBalanceCollection);

    const store = mockStore();
    await store.dispatch(fetchPurchasesAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPurchasesAction.pending.type,
      fetchPurchasesAction.fulfilled.type,
    ]);
  });

  it('loadMorePurchasesAction', async () => {
    mockAPI
      .onGet(`${generatePath(ApiBalanceRoute.All)}${MockData.QueryString}`)
      .reply(200, mockBalanceCollection);

    const store = mockStore();
    await store.dispatch(loadMorePurchasesAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMorePurchasesAction.pending.type,
      loadMorePurchasesAction.fulfilled.type,
    ]);
  });
});