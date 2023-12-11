import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {MockData, makeFakeReviewCollection, makeMockReviewData} from "../../utils/mock-data";
import {generatePath} from "react-router";
import {ApiRoute} from "../../constants/route";
import {addReviewAction, fetchReviewsAction} from "./async-actions";

describe('Reviews Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);

  it('fetchReviewsAction test', async () => {
    const mockReviews = makeFakeReviewCollection();

    mockAPI
      .onGet(generatePath(ApiRoute.Reviews, {id: MockData.Id}))
      .reply(201, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(MockData.Id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('addReviewAction test', async () => {
    const mockData = makeMockReviewData();
    const mockReviews = makeFakeReviewCollection();

    mockAPI
      .onPost(generatePath(ApiRoute.Reviews, {id: MockData.Id}))
      .reply(201, mockReviews);

    const store = mockStore();
    await store.dispatch(addReviewAction({id: MockData.Id, review: mockData}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type,
    ]);
  });
});
