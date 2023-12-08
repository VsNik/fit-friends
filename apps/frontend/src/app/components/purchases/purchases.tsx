import React from 'react';
import { ButtonFloat } from '../ui/button-float/button-float';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { Toggle } from '../ui/form/toggle/toggle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as balancesSelector from '../../store/balances/balances-select';
import { Loader } from '../loader/loader';
import { CardsOnPage, LoadStatus } from '../../constants/common';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../constants/route';
import { loadMorePurchasesAction } from '../../store/balances/async-actions';
import { getPurchasesQuery } from '../../utils/query-string';

export const Purchases: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const balances = useAppSelector(balancesSelector.balances);
  const page = useAppSelector(balancesSelector.page);
  const total = useAppSelector(balancesSelector.total);
  const loadStatus = useAppSelector(balancesSelector.loadStatus);

  const isLoading = loadStatus === LoadStatus.Loading;
  const trainings = balances.map((balance) => balance.training);
  const pages = Math.ceil(total / CardsOnPage.Purchases);

  const handleLoadMoreClick = () => {
    dispatch(loadMorePurchasesAction(getPurchasesQuery(page + 1)));
  }

  return (
    <div className="my-purchases__wrapper">
      {isLoading && <Loader />}
      
      <ButtonFloat text="Назад" icon="arrow-left" className="my-purchases__back" onClick={() => navigation(RouteName.Home)} />

      <div className="my-purchases__title-wrapper">
        <h1 className="my-purchases__title">Мои покупки</h1>
        <div className="my-purchases__controls">
          <Toggle name="user-agreement" label="Только активные" className="custom-toggle--switch-right my-purchases__switch" />
        </div>
      </div>

      <ul className="my-purchases__list">
        {trainings?.map((training) => (
          <li key={training.id} className="my-purchases__item">
            <ThumbnailTraining training={training} />
          </li>
        ))}
      </ul>

      {page < pages &&
        <ButtonShowMore className="my-purchases__show-more" onClick={handleLoadMoreClick} />
      }      
    </div>
  );
};
