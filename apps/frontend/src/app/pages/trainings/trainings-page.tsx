import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layouts/app-layout/app-layout';
import { TrainingsFilter } from '../../components/trainings-filter/trainings-filter';
import { TrainingCatalog } from '../../components/training-catalog/training-catalog';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrainingsAction, loadMoreTrainingsAction } from '../../store/trainings/async-actions';
import { getTrainingsQuery } from '../../utils/query-string';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { RouteName } from '../../constants/route';
import * as trainingsSelector from '../../store/trainings/trainings-select';

export const TrainingsPage: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(trainingsSelector.filter);
  const sorting = useAppSelector(trainingsSelector.sorting);
  const direction = useAppSelector(trainingsSelector.direction);
  const page = useAppSelector(trainingsSelector.page);

  useEffect(() => {
    const queryString = getTrainingsQuery(filters, sorting, direction);
    dispatch(fetchTrainingsAction(queryString));
  }, [dispatch, filters, sorting, direction]);

  const handleShowMoreClick = () => {
    dispatch(
      loadMoreTrainingsAction(getTrainingsQuery(filters, sorting, direction, page + 1)
    ))
  }

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>

            <div className="gym-catalog-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="gym-catalog-form__wrapper">
                <ButtonFloat
                  text="Назад"
                  icon="arrow-left"
                  onClick={() => navigation(RouteName.Home)}
                  className="gym-catalog-form__btnback"
                  underline
                />
                
                <h3 className="gym-catalog-form__title">Фильтры</h3>
                <TrainingsFilter />
              </div>
            </div>

            <TrainingCatalog page={page} onShowMore={handleShowMoreClick} />
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
