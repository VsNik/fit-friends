import { IOrder } from '@fit-friends/shared';
import { OrderState } from '../../types/state-type';
import { LoadStatus } from '../../constants/common';
import { notificationsSlice } from '../notifications/notifications-slice';
import { UNKNOWN_ACTION, makeFakeOrder } from '../../utils/mock-data';
import { orderSlice } from './order-slice';
import { createOrderAction } from './async-action';

describe('OrderSlice test', () => {
  let state: OrderState;

  beforeEach(() => {
    state = {
      order: {} as IOrder,
      loadStatus: LoadStatus.Never,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(notificationsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({notifications: [], page: 1, total: 0, loadStatus: LoadStatus.Never});
  });

  describe('createOrderAction test', () => {
    it('should be change loadStatus to Loading if createOrderAction pending', function () {
      expect(orderSlice.reducer(state, {type: createOrderAction.pending.type}))
        .toEqual({order: {} as IOrder, loadStatus: LoadStatus.Loading})
    });

    it('should be update order if createOrderAction fulfilled', function () {
      const fakeOrder = makeFakeOrder();
      expect(orderSlice.reducer(state, {type: createOrderAction.fulfilled.type, payload: fakeOrder}))
        .toEqual({order: fakeOrder, loadStatus: LoadStatus.Loaded})
    });

    it('should be change loadStatus to Loaded if createOrderAction rejected', function () {
      expect(orderSlice.reducer(state, {type: createOrderAction.rejected.type}))
        .toEqual({order: {} as IOrder, loadStatus: LoadStatus.Loaded})
    });
  })
});
