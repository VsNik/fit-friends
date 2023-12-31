import { IUser, Role } from '@fit-friends/shared';
import React, { useEffect } from 'react';
import { UserCardLabel } from '../user-card-label/user-card-label';
import { getTrainingName, getUserLocation } from '../../../utils/helpers';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { UserCardGallary } from '../user-card-gallary/user-card-gallary';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchForCoachAction } from '../../../store/trainings/async-actions';
import { UserCardTrainingSlider } from '../user-card-training-slider/user-card-training-slider';
import { UserCardForm } from '../user-card-form/user-card-form';
import { FriendsButton } from '../friends-button/friends-button';
import { ReadyTrainingText } from '../../../constants/common';
import * as trainingsSelector from '../../../store/trainings/trainings-select';
import clsx from 'clsx';

interface UserCardCoachProps {
  user: IUser;
  onOpenMap: () => void;
  onOpenCertificatePopup: () => void;
  isLoading?: boolean;
}

export const UserCardCoach: React.FC<UserCardCoachProps> = ({ user, onOpenMap, onOpenCertificatePopup, isLoading }) => {
  const dispatch = useAppDispatch();
  const position = getUserLocation(user?.location);
  const trainings = useAppSelector(trainingsSelector.trainings);

  useEffect(() => {
    dispatch(fetchForCoachAction(user.id));
  }, [dispatch, user.id]);

  const checkTraing = user.role === Role.User ? user.ready : user.personalTraining;

  const readyText =
    user.role === Role.User
      ? checkTraing
        ? ReadyTrainingText.UserReady
        : ReadyTrainingText.UserNotReady
      : checkTraing
        ? ReadyTrainingText.CoachReady
        : ReadyTrainingText.CoachNotReady;

  return (
    <section className="user-card-coach" data-testid='coach-card-component'>
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">{user?.name}</h2>
            </div>

            <UserCardLabel position={position?.title} onOpenMap={onOpenMap} />

            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#icon-cup"></use>
                </svg>
                <span>Тренер</span>
              </div>

              <div
                className={clsx({
                  'user-card-coach__status': checkTraing,
                  'user-card-coach__status--check': checkTraing,
                  'user-card-coach-2__status': !checkTraing,
                  'user-card-coach-2__status--check': !checkTraing,
                })}
              >
                <span>{readyText}</span>
              </div>
            </div>

            <div className="user-card-coach__text" data-testid='user-description'>
              <p>{user?.bio}</p>
            </div>

            <ButtonFloat
              text="Посмотреть сертификаты"
              icon="icon-teacher"
              className="user-card-coach__sertificate"
              onClick={onOpenCertificatePopup}
            />

            <ul className="user-card-coach__hashtag-list">
              {user?.trainingType?.map((type) => (
                <li key={type} className="user-card-coach__hashtag-item">
                  <Hashtag title={getTrainingName(type)} dataTestId='training-type' />
                </li>
              ))}
            </ul>

            <FriendsButton user={user} disabled={isLoading} dataTestId='friend-button-element' />
          </div>

          <UserCardGallary images={user?.bgImage} className="user-card-coach__gallary" />
        </div>

        <div className="user-card-coach__training">
          <UserCardTrainingSlider trainings={trainings} />
          <UserCardForm user={user} />
        </div>
      </div>
    </section>
  );
};
