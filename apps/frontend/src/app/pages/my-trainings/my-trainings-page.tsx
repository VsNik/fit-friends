import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layouts/app-layout';
import { MyTrainingsFilter } from '../../components/my-trainings-filter/my-trainings-filter';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { RouteName } from '../../constants/route';
import { ThumbnailTraining } from '../../components/thumbnails/thumbnail-training/thumbnail-training';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMyTrainingsAction } from '../../store/trainings/async-actions';
import { Loader } from '../../components/loader/loader';
import { getMyTrainingsQuery } from '../../utils/query-string';
import { LoadStatus } from '../../constants/common';
import { ButtonShowMore } from '../../components/ui/button-show-more/button-show-more';
import * as trainingsSelector from '../../store/trainings/trainings-select';

export const MyTrainingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const trainings = useAppSelector(trainingsSelector.trainings);
  const filters = useAppSelector(trainingsSelector.filter);
  const page = useAppSelector(trainingsSelector.page);
  const loadStatus = useAppSelector(trainingsSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  useEffect(() => {
    const queryString = getMyTrainingsQuery(filters, page)
    dispatch(fetchMyTrainingsAction(queryString));
  }, [dispatch, filters, page]);

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Мои тренировки</h1>

            <div className="my-training-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="my-training-form__wrapper">
                <ButtonFloat
                  text="Назад"
                  icon="arrow-left"
                  className="my-training-form__btnback"
                  onClick={() => navigation(RouteName.Home)}
                  underline
                />
                <h3 className="my-training-form__title">фильтры</h3>
                <MyTrainingsFilter />
              </div>
            </div>

            <div className="inner-page__content">
                {isLoading && <Loader />}
              <div className="my-trainings">
                <ul className="my-trainings__list">
                  {trainings?.map((training) => (
                    <li key={training.id} className="my-trainings__item">
                      <ThumbnailTraining training={training} />
                    </li>
                  ))}
                </ul>

                <ButtonShowMore className='my-trainings__show-more' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
