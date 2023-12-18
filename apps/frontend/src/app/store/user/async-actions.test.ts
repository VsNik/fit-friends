import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {MockData, makeFakeUser, makeMockAddCertificateData, makeMockUpdateUserData} from "../../utils/mock-data";
import {ApiAuthRoute, ApiUser} from "../../constants/route";
import {
  addCertificateAction, deleteCertificateAction,
  fetchAuthAction,
  fetchUserAction, removeFriendAction, subscribeAction, toFriendAction,
  updateCertificateAction,
  updateUserAction
} from "./async-actions";
import {generatePath} from "react-router";

describe('User Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);
  const fakeUser = makeFakeUser();

  it('fetchAuthAction test', async () => {
    mockAPI
      .onGet(ApiAuthRoute.Check)
      .reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(fetchAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAuthAction.pending.type,
      fetchAuthAction.fulfilled.type,
    ]);
  });

  it('fetchUserAction test', async () => {
    mockAPI
      .onGet(generatePath(ApiUser.Show, {id: MockData.Id}))
      .reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(fetchUserAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchUserAction.pending.type,
      fetchUserAction.fulfilled.type,
    ]);
  });

  it('updateUserAction test', async () => {
    const mockUpdateData = makeMockUpdateUserData();

    mockAPI
      .onPatch(ApiUser.All, mockUpdateData)
      .reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(updateUserAction(mockUpdateData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      updateUserAction.pending.type,
      updateUserAction.fulfilled.type,
    ]);
  });

  it('addCertificateAction test', async () => {
    const mockCertificateData = makeMockAddCertificateData();

    mockAPI
      .onPost(ApiUser.Certificate, mockCertificateData)
      .reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(addCertificateAction(mockCertificateData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addCertificateAction.pending.type,
      addCertificateAction.fulfilled.type,
    ]);
  });

  it('updateCertificateAction test', async () => {
    const mockCertificateData = makeMockAddCertificateData();

    mockAPI
      .onPatch(ApiUser.Certificate, mockCertificateData)
      .reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(updateCertificateAction(mockCertificateData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      updateCertificateAction.pending.type,
      updateCertificateAction.fulfilled.type,
    ]);
  });

  it('deleteCertificateAction test', async () => {
    mockAPI
      .onPost(ApiUser.CertificateRemove, {src: MockData.Src})
      .reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(deleteCertificateAction(MockData.Src));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      deleteCertificateAction.pending.type,
      deleteCertificateAction.fulfilled.type,
    ]);
  });

  it('toFriendAction test', async () => {
    mockAPI
      .onPost(generatePath(ApiUser.ToFriend, {id: MockData.Id}))
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(toFriendAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      toFriendAction.pending.type,
      toFriendAction.fulfilled.type,
    ]);
  });

  it('removeFriendAction test', async () => {
    mockAPI
      .onPost(generatePath(ApiUser.RemoveFriendForCoach, {id: MockData.Id}))
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(removeFriendAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      removeFriendAction.pending.type,
      removeFriendAction.fulfilled.type,
    ]);
  });

  it('subscribeAction test', async () => {
    mockAPI
      .onPost(generatePath(ApiUser.Subscribe, {id: MockData.Id}))
      .reply(200, []);

    const store = mockStore();
    await store.dispatch(subscribeAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      subscribeAction.pending.type,
      subscribeAction.fulfilled.type,
    ]);
  });
});
