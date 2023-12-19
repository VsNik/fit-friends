import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {MockData, makeFakeTrainingCollection} from "../../utils/mock-data";
import {generatePath} from "react-router";
import {ApiTrainings} from "../../constants/route";
import {
  fetchForCoachAction,
  fetchForYouAction, fetchMyOrdersAction, fetchMyTrainingsAction,
  fetchPopularAction,
  fetchSpecialAction,
  fetchTrainingsAction, loadMoreAction, loadMoreMyOrdersAction,
  loadMoreTrainingsAction
} from "./async-actions";

describe('Trainings Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);
  const fakeTrainings = makeFakeTrainingCollection();

  it('fetchTrainingsAction test', async () => {
    mockAPI
      .onGet(`${ApiTrainings.All}${MockData.QueryString}`)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchTrainingsAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTrainingsAction.pending.type,
      fetchTrainingsAction.fulfilled.type,
    ]);
  });

  it('loadMoreTrainingsAction test', async () => {
    mockAPI
      .onGet(`${ApiTrainings.All}${MockData.QueryString}`)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(loadMoreTrainingsAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMoreTrainingsAction.pending.type,
      loadMoreTrainingsAction.fulfilled.type,
    ]);
  });

  it('fetchForYouAction test', async () => {
    mockAPI
      .onGet(ApiTrainings.ForYou)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchForYouAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchForYouAction.pending.type,
      fetchForYouAction.fulfilled.type,
    ]);
  });

  it('fetchSpecialAction test', async () => {
    mockAPI
      .onGet(ApiTrainings.Special)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchSpecialAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSpecialAction.pending.type,
      fetchSpecialAction.fulfilled.type,
    ]);
  });

  it('fetchPopularAction test', async () => {
    mockAPI
      .onGet(ApiTrainings.Popular)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchPopularAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPopularAction.pending.type,
      fetchPopularAction.fulfilled.type,
    ]);
  });

  it('fetchForCoachAction test', async () => {
    mockAPI
      .onGet(generatePath(ApiTrainings.ForCoach, {id: MockData.Id}))
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchForCoachAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchForCoachAction.pending.type,
      fetchForCoachAction.fulfilled.type,
    ]);
  });

  it('fetchMyOrdersAction test', async () => {
    mockAPI
      .onGet(`${ApiTrainings.Orders}${MockData.QueryString}`)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchMyOrdersAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyOrdersAction.pending.type,
      fetchMyOrdersAction.fulfilled.type,
    ]);
  });

  it('loadMoreMyOrdersAction test', async () => {
    mockAPI
      .onGet(`${ApiTrainings.Orders}${MockData.QueryString}`)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(loadMoreMyOrdersAction(MockData.QueryString));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMoreMyOrdersAction.pending.type,
      loadMoreMyOrdersAction.fulfilled.type,
    ]);
  });

  it('fetchMyTrainingsAction test', async () => {
    mockAPI
      .onGet(`${generatePath(ApiTrainings.ForCoach, {id: MockData.Id})}${MockData.QueryString}`)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(fetchMyTrainingsAction({authId: MockData.Id, queryString: MockData.QueryString}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchMyTrainingsAction.pending.type,
      fetchMyTrainingsAction.fulfilled.type,
    ]);
  });

  it('loadMoreAction test', async () => {
    mockAPI
      .onGet(`${generatePath(ApiTrainings.ForCoach, {id: MockData.Id})}${MockData.QueryString}`)
      .reply(200, fakeTrainings);

    const store = mockStore();
    await store.dispatch(loadMoreAction({authId: MockData.Id, queryString: MockData.QueryString}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loadMoreAction.pending.type,
      loadMoreAction.fulfilled.type,
    ]);
  });
});
