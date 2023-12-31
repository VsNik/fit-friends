import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layouts/app-layout/app-layout';
import { ButtonsSorting } from '../../components/ui/buttons-sorting/buttons-sorting';
import { ThumbnailTraining } from '../../components/thumbnails/thumbnail-training/thumbnail-training';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { RouteName } from '../../constants/route';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMyOrdersAction, loadMoreMyOrdersAction } from '../../store/trainings/async-actions';
import { Loader } from '../../components/loader/loader';
import { getMyOrdersQuery } from '../../utils/query-string';
import { ButtonShowMore } from '../../components/ui/button-show-more/button-show-more';
import { CardsOnPage, LoadStatus } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';

export const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trainings = useAppSelector(trainingsSelector.trainings);
  const loadStatus = useAppSelector(trainingsSelector.loadStatus);
  const sorting = useAppSelector(trainingsSelector.sortStatistic);
  const direction = useAppSelector(trainingsSelector.direction);  
  const page = useAppSelector(trainingsSelector.page);
  const total = useAppSelector(trainingsSelector.total);
  const isLoading = loadStatus === LoadStatus.Loading;

  const pages = Math.ceil(total / CardsOnPage.MyOrders);

  useEffect(() => {    
    dispatch(
      fetchMyOrdersAction(getMyOrdersQuery(sorting, direction)
    ));
  }, [dispatch, sorting, direction]);

  const handleLoadMoreClick = () => {
    dispatch(
      loadMoreMyOrdersAction(getMyOrdersQuery(sorting, direction, page + 1)
    ));
  }

  return (
    <AppLayout>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            {isLoading && <Loader />}
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

            {page < pages && 
              <ButtonShowMore className="my-orders__show-more" onClick={handleLoadMoreClick} dataTestId='show-more-button' />
            }
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
