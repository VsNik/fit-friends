import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { ForYouSlider } from '../../components/for-you-slider/for-you-slider';
import { SpecialSlider } from '../../components/special-slider/special-slider';
import { PopularSlider } from '../../components/popular-slider/popular-slider';
import { ForCompanySlider } from '../../components/for-company-slider/for-company-slider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchForYouAction, fetchPopularAction, fetchSpecialAction } from '../../store/trainings/async-actions';
import { fetchCompanyAction } from '../../store/users/async-actions';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import * as usersSelector from '../../store/users/users-select';
import { Loader } from '../../components/loader/loader';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoadingForYou = useAppSelector(trainingsSelector.isLoadingForYou);
  const isLoadingSpecial = useAppSelector(trainingsSelector.isLoadingSpecial);
  const isLoadingPopular = useAppSelector(trainingsSelector.isLoadingPopular);
  const isLoadingCompany = useAppSelector(usersSelector.isLoading);

  useEffect(() => {
    dispatch(fetchForYouAction());
    dispatch(fetchSpecialAction());
    dispatch(fetchPopularAction());
    dispatch(fetchCompanyAction());
  }, [dispatch]);

  if (isLoadingForYou || isLoadingSpecial || isLoadingPopular || isLoadingCompany) {
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
