import { IUser } from '@fit-friends/shared';
import { UserState } from '../../types/state-type';
import { LoadStatus } from '../../constants/common';
import { UNKNOWN_ACTION, fakeError, makeFakeUser } from '../../utils/mock-data';
import { fetchAuthAction, fetchUserAction, updateUserAction, addCertificateAction, updateCertificateAction, deleteCertificateAction, toFriendAction, removeFriendAction, subscribeAction } from './async-actions';
import { userSlice } from './user-slice';

describe('userSlice test', () => {
  let state: UserState;

  beforeEach(() => {
    state = {
      user: {} as IUser,
      loadStatus: LoadStatus.Never,
      error: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({user: {}, loadStatus: LoadStatus.Never, error: null});
  });

  describe('fetchAuthAction test', function () {
    it('should be change loadStatus to Loading if fetchAuthAction pending', function () {
      expect(userSlice.reducer(state, {type: fetchAuthAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user if fetchAuthAction fulfilled', function () {
      const fakeUser = makeFakeUser();
      expect(userSlice.reducer(state, {type: fetchAuthAction.fulfilled.type, payload: fakeUser}))
        .toEqual({user: fakeUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if fetchAuthAction rejected', function () {
      expect(userSlice.reducer(state, {type: fetchAuthAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  });

  describe('fetchUserAction test', function () {
    it('should be change loadStatus to Loading if fetchUserAction pending', function () {
      expect(userSlice.reducer(state, {type: fetchUserAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user if fetchUserAction fulfilled', function () {
      const fakeUser = makeFakeUser();
      expect(userSlice.reducer(state, {type: fetchUserAction.fulfilled.type, payload: fakeUser}))
        .toEqual({user: fakeUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if fetchUserAction rejected', function () {
      expect(userSlice.reducer(state, {type: fetchUserAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  });

  describe('updateUserAction test', function () {
    it('should be change loadStatus to Loading if updateUserAction pending', function () {
      expect(userSlice.reducer(state, {type: updateUserAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user if updateUserAction fulfilled', function () {
      const fakeUser = makeFakeUser();
      expect(userSlice.reducer(state, {type: updateUserAction.fulfilled.type, payload: fakeUser}))
        .toEqual({user: fakeUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if updateUserAction rejected', function () {
      expect(userSlice.reducer(state, {type: updateUserAction.rejected.type, payload: fakeError}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: fakeError});
    });
  });

  describe('addCertificateAction test', () => {
    it('should be change loadStatus to Loading if addCertificateAction pending', function () {
      expect(userSlice.reducer(state, {type: addCertificateAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user if addCertificateAction fulfilled', function () {
      const fakeUser = makeFakeUser();
      expect(userSlice.reducer(state, {type: addCertificateAction.fulfilled.type, payload: fakeUser}))
        .toEqual({user: fakeUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if addCertificateAction rejected', function () {
      expect(userSlice.reducer(state, {type: addCertificateAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  });

  describe('updateCertificateAction test', () => {
    it('should be change loadStatus to Loading if updateCertificateAction pending', function () {
      expect(userSlice.reducer(state, {type: updateCertificateAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user if updateCertificateAction fulfilled', function () {
      const fakeUser = makeFakeUser();
      expect(userSlice.reducer(state, {type: updateCertificateAction.fulfilled.type, payload: fakeUser}))
        .toEqual({user: fakeUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if updateCertificateAction rejected', function () {
      expect(userSlice.reducer(state, {type: updateCertificateAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  });

  describe('deleteCertificateAction test', () => {
    it('should be change loadStatus to Loading if deleteCertificateAction pending', function () {
      expect(userSlice.reducer(state, {type: deleteCertificateAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user if deleteCertificateAction fulfilled', function () {
      const fakeUser = makeFakeUser();
      expect(userSlice.reducer(state, {type: deleteCertificateAction.fulfilled.type, payload: fakeUser}))
        .toEqual({user: fakeUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if deleteCertificateAction rejected', function () {
      expect(userSlice.reducer(state, {type: deleteCertificateAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  });

  describe('toFriendAction test', () => {
    it('should be change loadStatus to Loading if toFriendAction pending', function () {
      expect(userSlice.reducer(state, {type: toFriendAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user isFollowr if toFriendAction fulfilled', function () {
      const noFriendUser = makeFakeUser();
      const friendUser = {...noFriendUser, isFollow: true};
      state.user = noFriendUser;

      expect(userSlice.reducer(state, {type: toFriendAction.fulfilled.type}))
        .toEqual({user: friendUser, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if toFriendAction rejected', function () {
      expect(userSlice.reducer(state, {type: toFriendAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  })

  describe('removeFriendAction test', () => {
    it('should be change loadStatus to Loading if removeFriendAction pending', function () {
      expect(userSlice.reducer(state, {type: removeFriendAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be update user isFollowr if removeFriendAction fulfilled', function () {
      const noFriendUser = makeFakeUser();
      state.user = {...noFriendUser, isFollow: true};

      expect(userSlice.reducer(state, {type: removeFriendAction.fulfilled.type}))
        .toEqual({user: {...noFriendUser, isFollow: false}, loadStatus: LoadStatus.Loaded, error: null});
    });

    it('should be change loadStatus to Loaded if removeFriendAction rejected', function () {
      expect(userSlice.reducer(state, {type: removeFriendAction.rejected.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loaded, error: null});
    });
  });

  describe('subscribeAction test', function () {
    it('should be change loadStatus to Loading if subscribeAction pending', function () {
      expect(userSlice.reducer(state, {type: subscribeAction.pending.type}))
        .toEqual({user: {}, loadStatus: LoadStatus.Loading, error: null});
    });

    it('should be change user isSubscribe if toFriendAction fulfilled', function () {
      const noSubscribedUser = {...makeFakeUser(), isSubscribe: false};
      const subscribeUser = {...noSubscribedUser, isSubscribe: true};
      state.user = noSubscribedUser;

      expect(userSlice.reducer(state, {type: subscribeAction.fulfilled.type}))
        .toEqual({user: subscribeUser, loadStatus: LoadStatus.Loaded, error: null});

      state.user = subscribeUser;

      expect(userSlice.reducer(state, {type: subscribeAction.fulfilled.type}))
        .toEqual({user: noSubscribedUser, loadStatus: LoadStatus.Loaded, error: null});
    });
  });
});
