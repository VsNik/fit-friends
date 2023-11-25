import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layouts/app-layout';
import { ButtonsSorting } from '../../components/ui/buttons-sorting/buttons-sorting';
import { ThumbnailTraining } from '../../components/thumbnails/thumbnail-training/thumbnail-training';
import { Button } from '../../components/ui/button/button';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { RouteName } from '../../constants/route';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOrderTrainingAction } from '../../store/trainings/async-actions';
import { Loader } from '../../components/loader/loader';
import { getMyOrdersQuery } from '../../utils/query-string';

export const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trainings = useAppSelector(trainingsSelector.trainings);
  const isLoading = useAppSelector(trainingsSelector.isLoading);
  const sorting = useAppSelector(trainingsSelector.sortStatistic);
  const direction = useAppSelector(trainingsSelector.direction);
  const page = useAppSelector(trainingsSelector.page);

  useEffect(() => {
    const queryString = getMyOrdersQuery(sorting, direction);
    dispatch(fetchOrderTrainingAction(queryString));
  }, [dispatch, sorting, direction, page]);

  return (
    <AppLayout>
      <section className="my-orders">
        {isLoading ?? <Loader />}
        <div className="container">
          <div className="my-orders__wrapper">
            <ButtonFloat text="Назад" icon="arrow-left" className="my-orders__back" onClick={() => navigate(RouteName.Account)} underline />

            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <ButtonsSorting sorting={sorting} direction={direction} />
            </div>

            <ul className="my-orders__list">
              {trainings.map((training) => (
                <li key={training.id} className="my-orders__item">
                  <ThumbnailTraining training={training} statistic />
                </li>
              ))}
            </ul>

            <div className="show-more my-orders__show-more">
              <Button text="Показать еще" className="show-more__button show-more__button--more" />
              <Button text="Вернуться в начало" className="show-more__button show-more__button--to-top" />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
