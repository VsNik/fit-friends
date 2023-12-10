import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { NotificationsState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeNotification, makeFakeNotifications } from '../../utils/mock-data';
import { fetchNotificationAction, removeNotificationAction } from './async-actions';
import { notificationsSlice } from './notifications-slice';

describe('notificationsSlice test', () => {
  let state: NotificationsState;

  beforeEach(() => {
    state = {
      notifications: [],
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      loadStatus: LoadStatus.Never,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(notificationsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({notifications: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Never});
  });

  describe('fetchNotificationAction test', () => {
    it('should be update loadStatus to Loading if fetchNotificationAction pending', function () {
      expect(notificationsSlice.reducer(state, {type: fetchNotificationAction.pending.type}))
        .toEqual({notifications: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading})
    });

    it('should be update notifications if fetchNotificationAction fulfilled', function () {
      const fakeNotifications = makeFakeNotifications();
      expect(notificationsSlice.reducer(state, {type: fetchNotificationAction.fulfilled.type, payload: fakeNotifications}))
        .toEqual({notifications: fakeNotifications.data, page: fakeNotifications.page, total: fakeNotifications.total, loadStatus: LoadStatus.Loaded})
    });

    it('should be update loadStatus to Loaded if fetchNotificationAction rejected', function () {
      expect(notificationsSlice.reducer(state, {type: fetchNotificationAction.rejected.type}))
        .toEqual({notifications: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded})
    });
  });

  describe('removeNotificationAction test', () => {
    it('should be update loadStatus to Loading if removeNotificationAction pending', function () {
      expect(notificationsSlice.reducer(state, {type: removeNotificationAction.pending.type}))
        .toEqual({notifications: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loading})
    });

    it('should be update notifications if removeNotificationAction fulfilled', function () {
      const fakeNotifications = [makeFakeNotification(), makeFakeNotification()]
      state.notifications = fakeNotifications;
      state.total = state.notifications.length;
      expect(notificationsSlice.reducer(state, {type: removeNotificationAction.fulfilled.type, payload: fakeNotifications[0].id}))
        .toEqual({notifications: [state.notifications[1]], page: DefaultPaginate.Page, total: fakeNotifications.length - 1, loadStatus: LoadStatus.Loaded})
    });

    it('should be update loadStatus to Loaded if removeNotificationAction rejected', function () {
      expect(notificationsSlice.reducer(state, {type: removeNotificationAction.rejected.type}))
        .toEqual({notifications: [], page: DefaultPaginate.Page, total: DefaultPaginate.Total, loadStatus: LoadStatus.Loaded})
    });
  })
});
