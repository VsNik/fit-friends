import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { AppLayout } from '../../components/layouts/app-layout/app-layout';
import { ReviewsBar } from '../../components/reviews-bar/reviews-bar';
import { TrainingInfo } from '../../components/training/training-info/training-info';
import { TrainingVideo } from '../../components/training/training-video/training-video';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { BuyPopup } from '../../components/popups/buy-popup/buy-popup';
import { fetchTrainingAction } from '../../store/training/async-actions';
import { fetchReviewsAction } from '../../store/reviews/async-actions';
import { Modal } from '../../components/ui/modal/modal';
import { ReviewPopup } from '../../components/popups/review-popup/review-popup';
import { LoadStatus } from '../../constants/common';
import * as authSelectors from '../../store/auth/auth-select';
import * as trainingSelector from '../../store/training/training-select';
import * as reviewsSelector from '../../store/reviews/reviews-select';
import * as balanceSelector from '../../store/balance/balance-select';
import * as orderSelector from '../../store/order/order-select';
import { fetchBalanceAction } from '../../store/balance/async-action';
import clsx from 'clsx';

export const TrainingCardPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const training = useAppSelector(trainingSelector.training);
  const reviews = useAppSelector(reviewsSelector.reviews);
  const trainingLoadStatus = useAppSelector(trainingSelector.loadStatus);
  const role = useAppSelector(authSelectors.authRole)!;
  const authId = useAppSelector(authSelectors.authId);
  const balance = useAppSelector(balanceSelector.balance);
  const order = useAppSelector(orderSelector.order);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [openBuyPopup, setOpenBuyPopup] = useState<boolean>(false);
  const [openReviewPopup, setOpenReviewPopup] = useState<boolean>(false);

  const isTrainingLoading = trainingLoadStatus === LoadStatus.Loading;
  const trainingId = params.id!;

  const isPositivaBalance = (!!balance && balance.count > 0) || !!balance?.isActive;
  const isAuthor = training.coach?.id === authId;

  useEffect(() => {
    dispatch(fetchTrainingAction(trainingId));
    dispatch(fetchReviewsAction(trainingId));
  }, [dispatch, trainingId]);

  useEffect(() => {
    if (role === Role.User) {
      dispatch(fetchBalanceAction(trainingId));
    }
  }, [order, dispatch, trainingId, role]);

  const onChangeMode = (value: boolean) => {
    setIsEditable(value);
  };

  const handleOpenBuyPopup = () => setOpenBuyPopup(true);
  const handleCloseBuyPopup = () => setOpenBuyPopup(false);
  const handleOpenReviewPopup = () => setOpenReviewPopup(true);
  const handleCloseReviewPopup = () => setOpenReviewPopup(false);

  return (
    <AppLayout>
      <section className="inner-page" data-testid="training-card-page-component">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <ReviewsBar reviews={reviews} role={role} onOpenPopup={handleOpenReviewPopup} />

            <div className={clsx('training-card', { 'training-card--edit': isEditable })} data-testid="training-card-content">
              <TrainingInfo
                training={training}
                isLoading={isTrainingLoading}
                isAuthor={isAuthor}
                role={role}
                isEditable={isEditable}
                onChangeMode={onChangeMode}
                onOpenBuyPopup={handleOpenBuyPopup}
                isPositiveBalance={isPositivaBalance}
              />

              <TrainingVideo
                trainingId={trainingId}
                role={role}
                balance={balance}
                video={training.video}
                isEditable={isEditable}
                isAuthor={isAuthor}
                setIsEditable={setIsEditable}
                isPositiveBalance={isPositivaBalance}
              />
            </div>
          </div>
        </div>
      </section>

      {role === Role.User && (
        <>
          <Modal isOpen={openBuyPopup} onClose={handleCloseBuyPopup}>
            <BuyPopup onClose={handleCloseBuyPopup} title="Купить тренировку" training={training} />
          </Modal>
          <Modal isOpen={openReviewPopup} onClose={handleCloseReviewPopup}>
            <ReviewPopup onClose={handleCloseReviewPopup} title="Оставить отзыв" trainingId={training.id} />
          </Modal>
        </>
      )}
    </AppLayout>
  );
};
