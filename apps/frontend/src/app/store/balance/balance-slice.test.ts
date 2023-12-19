import { LoadStatus } from '../../constants/common';
import { BalancState } from '../../types/state-type';
import { UNKNOWN_ACTION, makeFakeBalance } from '../../utils/mock-data';
import { dismissionAction, fetchBalanceAction, setActiveAction, setNoActiveAction } from './async-action';
import { balanceSlice } from './balance-slice';

describe('BalanceSlice test', () => {
  let state: BalancState;

  beforeEach(() => {
    state = {
      balanc: null,
      loadStatus: LoadStatus.Never,
    };
  });

  const balance = makeFakeBalance();

  it('should return initial state', () => {
    expect(balanceSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({balanc: null, loadStatus: LoadStatus.Never})
  });

  describe('fetchBalanceAction test', () => {
    it('should be loadStatus to loaded if fetchBalanceAction pending', function () {
      expect(balanceSlice.reducer(state, {type: fetchBalanceAction.pending.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loading})
    });

    it('should be update balance if fetchBalanceAction fulfilled', function () {
      expect(balanceSlice.reducer(state, {type: fetchBalanceAction.fulfilled.type, payload: balance}))
        .toEqual({balanc: balance, loadStatus: LoadStatus.Loaded})
    });

    it('should be loadStatus to loaded if fetchBalanceAction rejected', function () {
      expect(balanceSlice.reducer(state, {type: fetchBalanceAction.rejected.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loaded})
    });
  });

  describe('dismissionAction test', () => {
    it('should be loadStatus to loaded if dismissionAction pending', function () {
      expect(balanceSlice.reducer(state, {type: dismissionAction.pending.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loading})
    });

    it('should be update balance if dismissionAction fulfilled', function () {
      expect(balanceSlice.reducer(state, {type: dismissionAction.fulfilled.type, payload: balance}))
        .toEqual({balanc: balance, loadStatus: LoadStatus.Loaded})
    });

    it('should be loadStatus to loaded if dismissionAction rejected', function () {
      expect(balanceSlice.reducer(state, {type: dismissionAction.rejected.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loaded})
    });
  });

  describe('setActiveAction test', () => {
    it('should be loadStatus to loaded if setActiveAction pending', function () {
      expect(balanceSlice.reducer(state, {type: setActiveAction.pending.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loading})
    });

    it('should be update balance if setActiveAction fulfilled', function () {
      expect(balanceSlice.reducer(state, {type: setActiveAction.fulfilled.type, payload: balance}))
        .toEqual({balanc: balance, loadStatus: LoadStatus.Loaded})
    });

    it('should be loadStatus to loaded if setActiveAction rejected', function () {
      expect(balanceSlice.reducer(state, {type: setActiveAction.rejected.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loaded})
    });
  });

  describe('setNoActiveAction test', () => {
    it('should be loadStatus to loaded if setNoActiveAction pending', function () {
      expect(balanceSlice.reducer(state, {type: setNoActiveAction.pending.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loading})
    });

    it('should be update balance if setNoActiveAction fulfilled', function () {
      expect(balanceSlice.reducer(state, {type: setNoActiveAction.fulfilled.type, payload: balance}))
        .toEqual({balanc: balance, loadStatus: LoadStatus.Loaded})
    });

    it('should be loadStatus to loaded if setNoActiveAction rejected', function () {
      expect(balanceSlice.reducer(state, {type: setNoActiveAction.rejected.type}))
        .toEqual({balanc: null, loadStatus: LoadStatus.Loaded})
    });
  });
});
