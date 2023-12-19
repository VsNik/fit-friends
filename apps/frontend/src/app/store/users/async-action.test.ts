import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {MockData, makeFakeUserCollection} from "../../utils/mock-data";
import {ApiUser} from "../../constants/route";
import {
  fetchCoachFriendsAction,
  fetchCompanyAction,
  fetchUserFriendsAction,
  fetchUsersAction, loadMoreCoachFriendsAction,
  loadMoreUserFriendsAction,
  loadMoreUsersAction
} from "./async-actions";

describe('Users Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);
  const fakeUsers = makeFakeUserCollection();

  it('fetchCompanyAction test', async () => {
    mockAPI
      .onGet(ApiUser.Company)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(fetchCompanyAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCompanyAction.pending.type,
      fetchCompanyAction.fulfilled.type,
    ]);
  });

  it('fetchUsersAction test', async () => {
    mockAPI
      .onGet(`${ApiUser.All}${MockData.QueryString}`)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(fetchUsersAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUsersAction.pending.type,
      fetchUsersAction.fulfilled.type,
    ]);
  });

  it('loadMoreUsersAction test', async () => {
    mockAPI
      .onGet(`${ApiUser.All}${MockData.QueryString}`)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(loadMoreUsersAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMoreUsersAction.pending.type,
      loadMoreUsersAction.fulfilled.type,
    ]);
  });

  it('fetchUserFriendsAction test', async () => {
    mockAPI
      .onGet(`${ApiUser.FriendsUser}${MockData.QueryString}`)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(fetchUserFriendsAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserFriendsAction.pending.type,
      fetchUserFriendsAction.fulfilled.type,
    ]);
  });

  it('loadMoreUserFriendsAction test', async () => {
    mockAPI
      .onGet(`${ApiUser.FriendsUser}${MockData.QueryString}`)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(loadMoreUserFriendsAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMoreUserFriendsAction.pending.type,
      loadMoreUserFriendsAction.fulfilled.type,
    ]);
  });

  it('fetchCoachFriendsAction test', async () => {
    mockAPI
      .onGet(`${ApiUser.FriendsCoach}${MockData.QueryString}`)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(fetchCoachFriendsAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCoachFriendsAction.pending.type,
      fetchCoachFriendsAction.fulfilled.type,
    ]);
  });

  it('loadMoreCoachFriendsAction test', async () => {
    mockAPI
      .onGet(`${ApiUser.FriendsCoach}${MockData.QueryString}`)
      .reply(200, fakeUsers);

    const store = mockStore();
    await store.dispatch(loadMoreCoachFriendsAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMoreCoachFriendsAction.pending.type,
      loadMoreCoachFriendsAction.fulfilled.type,
    ]);
  });
});
