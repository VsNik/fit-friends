import { BalanceFiter } from '@fit-friends/shared';
import { BalancesState } from '../../types/state-type';
import { DefaultPaginate, LoadStatus } from '../../constants/common';
import { balancesSlice } from './balances-slice';
import { UNKNOWN_ACTION, makeFakeBalanceCollection } from '../../utils/mock-data';
import { fetchPurchasesAction, loadMorePurchasesAction } from './async-actions';

describe('', () => {
  let state: BalancesState;

  beforeEach(() => {
    state = {
      balances: [],
      filter: BalanceFiter.All,
      page: DefaultPaginate.Page,
      total: DefaultPaginate.Total,
      loadStatus: LoadStatus.Never,
    };
  });

  const fakeBalances = makeFakeBalanceCollection();

  it('without additional parameters should return initial state', () => {
    expect(balancesSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({balances: [], loadStatus: LoadStatus.Never, filter: BalanceFiter.All, page: DefaultPaginate.Page, total: DefaultPaginate.Total});
  });

  describe('fetchPurchasesAction: test', () => {
    it('should be update loadStatus to loading if fetchPurchasesAction pending', function () {
      expect(balancesSlice.reducer(state, {type: fetchPurchasesAction.pending.type}))
        .toEqual({balances: [], loadStatus: LoadStatus.Loading, filter: BalanceFiter.All, page: DefaultPaginate.Page, total: DefaultPaginate.Total})
    });

    it('should be update balances if fetchPurchasesAction pending', function () {
      expect(balancesSlice.reducer(state, {type: fetchPurchasesAction.fulfilled.type, payload: fakeBalances}))
        .toEqual({balances: fakeBalances.data, loadStatus: LoadStatus.Loaded, filter: BalanceFiter.All, page: fakeBalances.page, total: fakeBalances.total})
    });

    it('should be update loadStatus to loaded if fetchPurchasesAction rejected', function () {
      expect(balancesSlice.reducer(state, {type: fetchPurchasesAction.rejected.type}))
        .toEqual({balances: [], loadStatus: LoadStatus.Loaded, filter: BalanceFiter.All, page: DefaultPaginate.Page, total: DefaultPaginate.Total})
    });
  });

  describe('loadMorePurchasesAction test', () => {
    it('should be set loading if loadMorePurchasesAction pending', function () {
      expect(balancesSlice.reducer(state, {type: loadMorePurchasesAction.pending.type}))
        .toEqual({balances: [], loadStatus: LoadStatus.Loading, filter: BalanceFiter.All, page: DefaultPaginate.Page, total: DefaultPaginate.Total})
    });

    it('should be add balances to exist state if loadMorePurchasesAction pending', function () {
      state.balances = fakeBalances.data;

      expect(balancesSlice.reducer(state, {type: loadMorePurchasesAction.fulfilled.type, payload: fakeBalances}))
        .toEqual({balances: [...state.balances, ...fakeBalances.data], loadStatus: LoadStatus.Loaded, filter: BalanceFiter.All, page: fakeBalances.page, total: 0})
    });

    it('should be update loadStatus to loaded if loadMorePurchasesAction rejected', function () {
      expect(balancesSlice.reducer(state, {type: loadMorePurchasesAction.rejected.type}))
        .toEqual({balances: [], loadStatus: LoadStatus.Loaded, filter: BalanceFiter.All, page: DefaultPaginate.Page, total: DefaultPaginate.Total})
    });
  })
});
