import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {generatePath} from "react-router";
import {ApiRoute} from "../../constants/route";
import {MockData, makeFakeNotifications} from "../../utils/mock-data";
import {fetchNotificationAction, removeNotificationAction, sendNotificationAction} from "./async-actions";

describe('Notification Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);

  it('fetchNotificationAction test', async () => {
    const mockNotify = makeFakeNotifications();

    mockAPI
      .onGet(generatePath(ApiRoute.Alerts))
      .reply(200, mockNotify);

    const store = mockStore();
    await store.dispatch(fetchNotificationAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNotificationAction.pending.type,
      fetchNotificationAction.fulfilled.type,
    ]);
  });

  it('removeNotificationAction test', async () => {
    mockAPI
      .onDelete(generatePath(ApiRoute.Alert, {id: MockData.Id}))
      .reply(204, []);

    const store = mockStore();
    await store.dispatch(removeNotificationAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      removeNotificationAction.pending.type,
      removeNotificationAction.fulfilled.type,
    ]);
  });

  it('sendNotificationAction test', async () => {
    mockAPI
      .onGet(generatePath(ApiRoute.Notify))
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(sendNotificationAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendNotificationAction.pending.type,
      sendNotificationAction.fulfilled.type,
    ]);
  });
})