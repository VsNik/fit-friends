import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { generatePath } from 'react-router';
import api from '../../services/api';
import { RootState } from '..';
import { 
    MockData, 
    TokenName, 
    makMockUserData, 
    makeFakeUser, 
    makeMockAuthData, 
    makeMockCoachData, 
    makeMockProfile, 
    makeMockToken, 
    makeMockiSnupData 
} from '../../utils/mock-data';
import { SliceName, StatusCode } from '../../constants/common';
import { checkAuthAction, createCoachAction, createUserAction, loginAction, logoutAction, signupAction } from './async-actions';
import { redirectToRoute } from '../action';
import { ApiAuthRoute } from '../../constants/route';

describe('Auth Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState, Action, ThunkDispatch<RootState, undefined, Action>>(middlewares);

  it('should dispatch LoginAction, RedirectToRoute and save tokens', async () => {
    const mockAuthToken = makeMockToken();
    const authData = makeMockAuthData();

    mockAPI
        .onPost(ApiAuthRoute.Login)
        .reply(StatusCode.Ok, mockAuthToken);

    Storage.prototype.setItem = jest.fn();
    const store = mockStore();
    await store.dispatch(loginAction(authData));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
        loginAction.pending.type, 
        redirectToRoute.type, 
        loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith(TokenName.Access, mockAuthToken.accessToken);
    expect(Storage.prototype.setItem).toBeCalledWith(TokenName.Refresh, mockAuthToken.refreshToken);
  });

  it('should dispatch SignupAction', async () => {
    const signupData = makeMockiSnupData();
    const mockUser = makeFakeUser();

    mockAPI
      .onPost(ApiAuthRoute.Signup)
      .reply(StatusCode.Created, mockUser);

    const store = mockStore();
    await store.dispatch(signupAction(signupData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      signupAction.pending.type,
      redirectToRoute.type,
      signupAction.fulfilled.type,
    ]);
  });

  it('should dispatch CreateUserAction, RedirectToRoute and save tokens', async () => {
    const mockUserData = makMockUserData();
    const mockUser = makeMockProfile();

    mockAPI
      .onPost(generatePath(ApiAuthRoute.User, {id: MockData.Id}))
      .reply(StatusCode.Created, mockUser);

    Storage.prototype.setItem = jest.fn();
    const store = mockStore({[SliceName.Auth]: {authId: MockData.Id}});
    await store.dispatch(createUserAction(mockUserData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createUserAction.pending.type,
      redirectToRoute.type,
      createUserAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith(TokenName.Access, mockUser.token.accessToken);
    expect(Storage.prototype.setItem).toBeCalledWith(TokenName.Refresh, mockUser.token.refreshToken);
  });

  it('should dispatch CreateCoachAction, RedirectToRoute and save tokens', async () => {
    const mockUserData = makeMockCoachData();
    const mockUser = makeMockProfile();

    mockAPI
      .onPost(generatePath(ApiAuthRoute.Coach, {id: MockData.Id}))
      .reply(StatusCode.Created, mockUser);

    Storage.prototype.setItem = jest.fn();
    const store = mockStore({[SliceName.Auth]: {authId: MockData.Id}});
    await store.dispatch(createCoachAction(mockUserData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      createCoachAction.pending.type,
      redirectToRoute.type,
      createCoachAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(2);
    expect(Storage.prototype.setItem).toBeCalledWith(TokenName.Access, mockUser.token.accessToken);
    expect(Storage.prototype.setItem).toBeCalledWith(TokenName.Refresh, mockUser.token.refreshToken);
  });

  it('checkAuthAction test ', async () => {
    const mockUser = makeMockProfile();

    mockAPI
      .onGet(ApiAuthRoute.Check)
      .reply(StatusCode.Ok, mockUser);

    const store = mockStore();
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('LogoutAction test', async () => {
    const mockAuthToken = makeMockToken();

    mockAPI
      .onPost(ApiAuthRoute.Logout, {refreshToken: mockAuthToken.refreshToken})
      .reply(StatusCode.NoContent, []);

    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    const store = mockStore();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.getItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledTimes(2);
    expect(Storage.prototype.removeItem).toBeCalledWith(TokenName.Access);
    expect(Storage.prototype.removeItem).toBeCalledWith(TokenName.Refresh);
  });
});
