import React from 'react';
import { PurchasesTitle } from './purchases-title/purchases-title';
import { ButtonFloat } from '../ui/button-float/button-float';
import { getFakeTrainings } from '../../fake-data/fake-training';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { Button } from '../ui/button/button';

const CONT_FACE_TRAININGS = 4;

export const Purchases: React.FC = () => {
  const trainings = getFakeTrainings(CONT_FACE_TRAININGS).data;

  return (
    <div className="my-purchases__wrapper">
      <ButtonFloat text="Назад" icon="arrow-left" className="my-purchases__back" />

      <PurchasesTitle />

      <ul className="my-purchases__list">
        {trainings?.map((training) => (
          <li key={training.id} className="my-purchases__item">
            <ThumbnailTraining training={training} />
          </li>
        ))}
      </ul>

      <div className="show-more my-purchases__show-more">
        <Button text='Показать еще' className='show-more__button show-more__button--more' />
        <Button text='Вернуться в начало' className='show-more__button show-more__button--to-top' />
      </div>
    </div>
  );
};
