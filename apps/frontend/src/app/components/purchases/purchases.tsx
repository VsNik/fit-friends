import React from 'react';
import { ButtonFloat } from '../ui/button-float/button-float';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { Toggle } from '../ui/form/toggle/toggle';
import { useAppSelector } from '../../store/hooks';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import { Loader } from '../loader/loader';

export const Purchases: React.FC = () => {
  const trainings = useAppSelector(trainingsSelector.trainings);
  const isLoading = useAppSelector(trainingsSelector.isLoading);

  return (
    <div className="my-purchases__wrapper">
      {isLoading && <Loader />}
      
      <ButtonFloat text="Назад" icon="arrow-left" className="my-purchases__back" />

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

      {!isLoading &&<ButtonShowMore className="my-purchases__show-more" />}
    </div>
  );
};
