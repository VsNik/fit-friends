import { Role } from '@fit-friends/shared';
import { LoadStatus } from '../../constants/common';
import { AuthState } from '../../types/state-type';
import { UNKNOWN_ACTION, fakeError, MockData } from '../../utils/mock-data';
import { checkAuthAction, createCoachAction, createUserAction, loginAction, logoutAction, signupAction } from './async-actions';
import {authSlice} from "./auth-slice";

describe('Slice: auth', () => {
  let state: AuthState;

  beforeEach(() => {
    state = {
      authId: '',
      isAuth: false,
      loadStatus: LoadStatus.Never,
      isReady: false,
      error: null,
    };
  });

  it('should return initial state', () => {
    expect(authSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({authId: '', isAuth: false, loadStatus: LoadStatus.Never, isReady: false, error: null})
  });

  describe('loginAction test', () => {
    it('should set authId, authRole and update isAuth to "true" if loginAction fulfilled', function () {
      expect(authSlice.reducer(state, {type: loginAction.fulfilled.type, payload: {id: MockData.Id, role: Role.User}}))
        .toEqual({authId: MockData.Id, authRole: Role.User, isAuth: true, isReady: false, error: null, loadStatus: LoadStatus.Never})
    });

    it('should be not update isAuth and error should be error object if loginAction rejected', () => {
      expect(authSlice.reducer(state, {type: loginAction.rejected.type, payload: fakeError}))
        .toEqual({authId: '', isAuth: false, isReady: false, error: fakeError, loadStatus: LoadStatus.Never})
    });
  });

  describe('signupAction test', () => {
    it('should be set authId, authRole, update isReady to true and isAuth to true if signupAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: signupAction.fulfilled.type, payload: {id: MockData.Id, role: Role.User}}))
        .toEqual({authId: MockData.Id, authRole: Role.User, isAuth: true, isReady: true, error: null, loadStatus: LoadStatus.Never})
    });

    it('should be not update isAuth and error should be error object', () => {
      expect(authSlice.reducer(state, {type: signupAction.rejected.type, payload: fakeError}))
        .toEqual({authId: '', isAuth: false, isReady: false, error: fakeError, loadStatus: LoadStatus.Never})
    });
  });

  describe('checkAuthAction test', () => {
    it('should be update loadStatus to loading if checkAuthAction pending', () => {
      expect(authSlice.reducer(state, {type: checkAuthAction.pending.type}))
        .toEqual({authId: '', isAuth: false, isReady: false, error: null, loadStatus: LoadStatus.Loading})
    });

    it('should be set authId, authRole , isAuth and update loadingStatus to Loaded if checkAuthAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: checkAuthAction.fulfilled.type, payload: {id: MockData.Id, role: Role.User}}))
        .toEqual({authId: MockData.Id, authRole: Role.User, isAuth: true, isReady: false, error: null, loadStatus: LoadStatus.Loaded})
    });

    it('should be not update isAuth and error should be error object if checkAuthAction rejected', () => {
      expect(authSlice.reducer(state, {type: checkAuthAction.rejected.type, payload: fakeError}))
        .toEqual({authId: '', isAuth: false, isReady: false, error: fakeError, loadStatus: LoadStatus.Loaded})
    });
  });

  describe('createUserAction test', () => {
    it('should be set isReady to false if createUserAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: createUserAction.fulfilled.type}))
        .toEqual({isReady: false, authId: '', isAuth: false, error: null, loadStatus: LoadStatus.Never})
    });

    it('should be set error to error object if createUserAction rejected', () => {
      expect(authSlice.reducer(state, {type: createUserAction.rejected.type, payload: fakeError}))
        .toEqual({isReady: false, authId: '', isAuth: false, error: fakeError, loadStatus: LoadStatus.Never})
    });
  });

  describe('createCoachAction test', () => {
    it('should be set isReady to false if createCoachAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: createCoachAction.fulfilled.type}))
        .toEqual({isReady: false, authId: '', isAuth: false, error: null, loadStatus: LoadStatus.Never})
    });

    it('should be set error to error object if createCoachAction rejected', () => {
      expect(authSlice.reducer(state, {type: createCoachAction.rejected.type, payload: fakeError}))
        .toEqual({isReady: false, authId: '', isAuth: false, error: fakeError, loadStatus: LoadStatus.Never})
    });
  });

  describe('logoutAction test', () => {
    it('should be change loadStatus if logoutAction pending', function () {
      expect(authSlice.reducer(state, {type: logoutAction.pending.type}))
        .toEqual({isAuth: false, authId: '', authRole: undefined, isReady: false, error: null, loadStatus: LoadStatus.Loading})
    });

    it('should be update isAuth to false and reset authId, authRole to undefined if logoutAction fulfilled', function () {
      expect(authSlice.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({isAuth: false, authId: '', authRole: undefined, isReady: false, error: null, loadStatus: LoadStatus.Loaded})
    });

    it('should be change loadStatus if logoutAction rejected', function () {
      expect(authSlice.reducer(state, {type: logoutAction.rejected.type}))
        .toEqual({isAuth: false, authId: '', authRole: undefined, isReady: false, error: null, loadStatus: LoadStatus.Loaded})
    });
  })
});
