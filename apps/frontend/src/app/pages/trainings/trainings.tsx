import React from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { TrainingFilter } from '../../components/training-filter/training-filter';
import { TrainingCatalog } from '../../components/training-catalog/training-catalog';

export const TrainingsPage: React.FC = () => {
  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>

            <TrainingFilter />

            <TrainingCatalog />

          </div>
        </div>
      </section>
    </AppLayout>
  );
};
