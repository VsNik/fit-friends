import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {RootState} from "../index";
import {Action} from "redux";
import {generatePath} from "react-router";
import {ApiRoute} from "../../constants/route";
import {MockData, makeFakeOrder, makeMockOrderData} from "../../utils/mock-data";
import {createOrderAction} from "./async-action";

describe('Order Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, void, Action>>(middlewares);

  it('createOrderAction test', async () => {
    const mockData = makeMockOrderData()
    const mockOrder = makeFakeOrder();

    mockAPI
      .onPost(generatePath(generatePath(ApiRoute.Orders, {id: MockData.Id}), mockData))
      .reply(201, mockOrder);

    const store = mockStore();
    await store.dispatch(createOrderAction({id: MockData.Id, order: mockData}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createOrderAction.pending.type,
      createOrderAction.fulfilled.type,
    ]);
  });
})