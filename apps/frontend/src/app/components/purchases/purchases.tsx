import React from 'react';
import { ButtonFloat } from '../ui/button-float/button-float';
import { getFakeTrainings } from '../../fake-data/fake-training';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { Toggle } from '../ui/form/toggle/toggle';

const CONT_FACE_TRAININGS = 4;

export const Purchases: React.FC = () => {
  const trainings = getFakeTrainings(CONT_FACE_TRAININGS).data;

  return (
    <div className="my-purchases__wrapper">
      <ButtonFloat text="Назад" icon="arrow-left" className="my-purchases__back" />
      <div className="my-purchases__title-wrapper">
      <h1 className="my-purchases__title">Мои покупки</h1>

      <div className="my-purchases__controls">
        <Toggle name="user-agreement" label='Только активные' className='custom-toggle--switch-right my-purchases__switch' />
      </div>
    </div>

      <ul className="my-purchases__list">
        {trainings?.map((training) => (
          <li key={training.id} className="my-purchases__item">
            <ThumbnailTraining training={training} />
          </li>
        ))}
      </ul>

      <ButtonShowMore className='my-purchases__show-more' />
    </div>
  );
};
