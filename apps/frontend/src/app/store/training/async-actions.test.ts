import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {
    MockData,
  makeFakeTraining,
  makeMockAddTrainingData,
  makeMockAddVideoData,
  makeMockUpdateTrainingData
} from "../../utils/mock-data";
import {generatePath} from "react-router";
import {ApiTrainings} from "../../constants/route";
import {
  createTrainingAction,
  fetchTrainingAction,
  removeVideoAction,
  saveVideoAction,
  updateTrainingAction
} from "./async-actions";
import {redirectToRoute} from "../action";

describe('Training Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, undefined, Action>>(middlewares);
  const fakeTraining = makeFakeTraining();

  it('fetchTrainingAction test', async () => {
    mockAPI
      .onGet(generatePath(ApiTrainings.Show, {id: MockData.Id}))
      .reply(200, fakeTraining);

    const store = mockStore();
    await store.dispatch(fetchTrainingAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchTrainingAction.pending.type,
      fetchTrainingAction.fulfilled.type,
    ]);
  });

  it('createTrainingAction test', async () => {
    const mockTrainingData = makeMockAddTrainingData();

    mockAPI
      .onPost(ApiTrainings.All)
      .reply(200, fakeTraining);

    const store = mockStore();
    await store.dispatch(createTrainingAction(mockTrainingData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createTrainingAction.pending.type,
      redirectToRoute.type,
      createTrainingAction.fulfilled.type,
    ]);
  });

  it('updateTrainingAction test', async () => {
    const mockTrainingData = makeMockUpdateTrainingData();

    mockAPI
      .onPatch(generatePath(ApiTrainings.Show, {id: MockData.Id}))
      .reply(200, fakeTraining);

    const store = mockStore();
    await store.dispatch(updateTrainingAction({id: MockData.Id, updateData: mockTrainingData}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      updateTrainingAction.pending.type,
      updateTrainingAction.fulfilled.type,
    ]);
  });

  it('removeVideoAction test', async () => {
    mockAPI
      .onPatch(generatePath(ApiTrainings.VideoRemove, {id: MockData.Id}))
      .reply(200, fakeTraining);

    const store = mockStore();
    await store.dispatch(removeVideoAction({id: MockData.Id, src: MockData.Src}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      removeVideoAction.pending.type,
      removeVideoAction.fulfilled.type,
    ]);
  });

  it('saveVideoAction test', async () => {
    const mockAddVideoData = makeMockAddVideoData();

    mockAPI
      .onPatch(generatePath(ApiTrainings.VideoUpload, {id: MockData.Id}), mockAddVideoData)
      .reply(200, fakeTraining);

    const store = mockStore();
    await store.dispatch(saveVideoAction({id: MockData.Id, formData: mockAddVideoData}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      saveVideoAction.pending.type,
      saveVideoAction.fulfilled.type,
    ]);
  });
});
