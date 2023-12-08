import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { Purchases } from '../../components/purchases/purchases';
import { useAppDispatch } from '../../store/hooks';
import { fetchPurchasesAction } from '../../store/balances/async-actions';
import { getPurchasesQuery } from '../../utils/query-string';

export const PurchasesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPurchasesAction(getPurchasesQuery()));
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="my-purchases">
        <div className="container">
          <Purchases />
        </div>
      </section>
    </AppLayout>
  );
};
