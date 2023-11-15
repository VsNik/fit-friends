import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { ForYouSlider } from '../../components/for-you-slider/for-you-slider';
import { SpecialSlider } from '../../components/special-slider/special-slider';
import { PopularSlider } from '../../components/popular-slider/popular-slider';
import { ForCompanySlider } from '../../components/for-company-slider/for-company-slider';
import { useAppDispatch } from '../../store/hooks';
import { fetchForYouAction, fetchPopularAction, fetchSpecialAction } from '../../store/trainings/async-actions';
import { fetchCompanyAction } from '../../store/users/async-actions';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchForYouAction());
    dispatch(fetchSpecialAction());
    dispatch(fetchPopularAction());
    dispatch(fetchCompanyAction());
  }, [dispatch]);

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
