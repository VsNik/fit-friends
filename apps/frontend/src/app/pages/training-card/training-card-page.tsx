import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '../../components/layouts/app-layout';
import { ReviewsBar } from '../../components/reviews-bar/reviews-bar';
import { TrainingInfo } from '../../components/training/training-info/training-info';
import { TrainingVideo } from '../../components/training/training-video/training-video';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BuyPopup } from '../../components/popups/buy-popup/buy-popup';
import { fetchTrainingAction } from '../../store/training/async-actions';
import { fetchReviewsAction } from '../../store/reviews/async-actions';
import * as authSelectors from '../../store/auth/auth-select';
import * as trainingSelector from '../../store/training/training-select';
import * as reviewsSelector from '../../store/reviews/reviews-select';
import clsx from 'clsx';

export const TrainingCardPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const training = useAppSelector(trainingSelector.training);
  const reviews = useAppSelector(reviewsSelector.reviews);
  const isTrainingLoading = useAppSelector(trainingSelector.isLoading);
  const isReviewsLoading = useAppSelector(reviewsSelector.isLoading);
  const { role } = useAppSelector(authSelectors.authUser);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [openBuyPopup, setOpenBuyPopup] = useState<boolean>(false);
  const trainingId = params.id!;

  useEffect(() => {
    dispatch(fetchTrainingAction(trainingId));
    dispatch(fetchReviewsAction(trainingId));
  }, [dispatch, trainingId]);

  const onChangeMode = (value: boolean) => {
    setIsEditable(value);
  };

  const handleOpenBuyPopup = () => {
    document.body.classList.add('scroll-lock');
    document.body.style.paddingRight = '15px';
    setOpenBuyPopup(true);
  };

  const handleCloseBuyPopup = () => {
    setOpenBuyPopup(false);
    document.body.classList.remove('scroll-lock');
    document.body.style.paddingRight = '';
  };

  if (isTrainingLoading || isReviewsLoading) {
    return <h3>Loading...</h3>
  }

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <ReviewsBar reviews={reviews} role={role} />

            <div className={clsx('training-card', { 'training-card--edit': isEditable })}>
              <TrainingInfo training={training} role={role} isEditable={isEditable} onChangeMode={onChangeMode} onOpenBuyPopup={handleOpenBuyPopup} />
              <TrainingVideo role={role} video={training.video} isEditable={isEditable} />
            </div>
          </div>
        </div>
      </section>

      <div className={clsx('modal', { 'is-active': openBuyPopup })}>
        <BuyPopup onClose={handleCloseBuyPopup} title='Купить тренировку' training={training} />
      </div>
    </AppLayout>
  );
};
