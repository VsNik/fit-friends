import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { ForYouSlider } from '../../components/for-you-slider/for-you-slider';
import { SpecialSlider } from '../../components/special-slider/special-slider';
import { PopularSlider } from '../../components/popular-slider/popular-slider';
import { ForCompanySlider } from '../../components/for-company-slider/for-company-slider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchForYouAction, fetchPopularAction, fetchSpecialAction } from '../../store/trainings/async-actions';
import { fetchCompanyAction } from '../../store/users/async-actions';
import { Loader } from '../../components/loader/loader';
import { LoadStatus } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import * as usersSelector from '../../store/users/users-select';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const forYouLoadStatus = useAppSelector(trainingsSelector.forYouLoadStatus);
  const specialLoadStatus = useAppSelector(trainingsSelector.specialLoadStatus);
  const popularLoadStatus = useAppSelector(trainingsSelector.popularLoadStatus);
  const loadStatusCompany = useAppSelector(usersSelector.loadStatus);

  useEffect(() => {
    dispatch(fetchForYouAction());
    dispatch(fetchSpecialAction());
    dispatch(fetchPopularAction());
    dispatch(fetchCompanyAction());
  }, [dispatch]);

  if (
      forYouLoadStatus === LoadStatus.Loading || 
      specialLoadStatus === LoadStatus.Loading || 
      popularLoadStatus === LoadStatus.Loading || 
      loadStatusCompany === LoadStatus.Loading
    ) {
    return <Loader />;
  }

  return (
    <AppLayout>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <ForYouSlider />
      <SpecialSlider />
      <PopularSlider />
      <ForCompanySlider />
    </AppLayout>
  );
};
