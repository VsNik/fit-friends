import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { TrainingsFilter } from '../../components/trainings-filter/trainings-filter';
import { TrainingCatalog } from '../../components/training-catalog/training-catalog';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrainingsAction } from '../../store/trainings/async-actions';
import { getTrainingsQuery } from '../../utils/query-string';
import * as trainingsSelector from '../../store/trainings/trainings-select';

export const TrainingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(trainingsSelector.filter);
  const sorting = useAppSelector(trainingsSelector.sorting);
  const direction = useAppSelector(trainingsSelector.direction);
  const page = useAppSelector(trainingsSelector.page);

  useEffect(() => {
    const queryString = getTrainingsQuery(filters, sorting, direction, page)
    dispatch(fetchTrainingsAction(queryString))
  }, [dispatch, filters, sorting, direction, page]);

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>

            <TrainingsFilter />

            <TrainingCatalog />

          </div>
        </div>
      </section>
    </AppLayout>
  );
};
