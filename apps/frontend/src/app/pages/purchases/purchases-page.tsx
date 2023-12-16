import React, { ChangeEvent, useEffect } from 'react';
import { BalanceFiter } from '@fit-friends/shared';
import { AppLayout } from '../../components/layouts/app-layout';
import { Purchases } from '../../components/purchases/purchases';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPurchasesAction, loadMorePurchasesAction } from '../../store/balances/async-actions';
import { getPurchasesQuery } from '../../utils/query-string';
import { CardsOnPage } from '../../constants/common';
import { setBalanceFilterAction } from '../../store/balances/balances-slice';
import * as balancesSelector from '../../store/balances/balances-select';

export const PurchasesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(balancesSelector.page);
  const total = useAppSelector(balancesSelector.total);
  const filter = useAppSelector(balancesSelector.filter);

  const pages = Math.ceil(total / CardsOnPage.Purchases);
  const showButton = page < pages;

  useEffect(() => {
    dispatch(fetchPurchasesAction(getPurchasesQuery(filter)));
  }, [dispatch, filter]);

  const handleLoadMoreClick = () => {
    dispatch(loadMorePurchasesAction(getPurchasesQuery(filter, page + 1)));
  }

  const handleSetFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    const check = filter === BalanceFiter.All ? BalanceFiter.Active : BalanceFiter.All;
    dispatch(setBalanceFilterAction(check));
  }

  return (
    <AppLayout>
      <section className="my-purchases" data-testid='purchases-page-component'>
        <div className="container">
          <Purchases 
            showButton={showButton} 
            onShowMore={handleLoadMoreClick} 
            filter={filter} 
            onSetFilter={handleSetFilter} 
          />
        </div>
      </section>
    </AppLayout>
  );
};
