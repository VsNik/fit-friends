import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { Purchases } from '../../components/purchases/purchases';
import { useAppDispatch } from '../../store/hooks';
import { fetchPurchasesAction } from '../../store/balances/async-actions';

export const PurchasesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPurchasesAction());
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
