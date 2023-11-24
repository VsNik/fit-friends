import React from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { Purchases } from '../../components/purchases/purchases';

export const PurchasesPage: React.FC = () => {
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
