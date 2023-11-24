import { IUser } from '@fit-friends/shared';
import React, { useEffect } from 'react';
import { UserCardLabel } from '../user-card-label/user-card-label';
import { getTrainingName, getUserLocation } from '../../../utils/helpers';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { Button } from '../../ui/button/button';
import { UserCardGallary } from '../user-card-gallary/user-card-gallary';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchForCoachAction } from '../../../store/trainings/async-actions';
import { UserCardCertificateSlider } from '../user-card-certificate-slider/user-card-certificate-slider';
import { UserCardForm } from '../user-card-form/user-card-form';
import * as trainingsSelector from '../../../store/trainings/trainings-select';
import clsx from 'clsx';

interface UserCardCoachProps {
  user: IUser;
  onOpenMap: () => void;
  onOpenCertificatePopup: () => void;
}

export const UserCardCoach: React.FC<UserCardCoachProps> = ({ user, onOpenMap, onOpenCertificatePopup }) => {
  const dispatch = useAppDispatch();
  const position = getUserLocation(user.location);
  const trainings = useAppSelector(trainingsSelector.trainings);

  useEffect(() => {
    dispatch(fetchForCoachAction());
  }, [dispatch]);

  return (
    <section className="user-card-coach">
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">{user.name}</h2>
            </div>

            <UserCardLabel position={position?.title} onOpenMap={onOpenMap} />

            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#icon-cup"></use>
                </svg>
                <span>Тренер</span>
              </div>

              <div className={clsx('user-card-coach__status', 'user-card-coach__status--check')}>
                <span>Готов тренировать</span>
              </div>
            </div>

            <div className="user-card-coach__text">
              <p>{user.bio}</p>
            </div>

            <ButtonFloat
              text="Посмотреть сертификаты"
              icon="icon-teacher"
              className="user-card-coach__sertificate"
              onClick={onOpenCertificatePopup}
            />

            <ul className="user-card-coach__hashtag-list">
              {user.trainingType?.map((type) => (
                <li key={type} className="user-card-coach__hashtag-item">
                  <Hashtag title={getTrainingName(type)} />
                </li>
              ))}
            </ul>

            <Button text="Добавить в друзья" className="user-card-coach__btn" />
          </div>

          <UserCardGallary
            images={user.bgImage ? [user.bgImage, '/assets/img/content/user-coach-photo2.jpg'] : []}
            className="user-card-coach__gallary"
          />
        </div>

        <div className="user-card-coach__training">
          <UserCardCertificateSlider trainings={trainings} />
          <UserCardForm />
        </div>
      </div>
    </section>
  );
};
