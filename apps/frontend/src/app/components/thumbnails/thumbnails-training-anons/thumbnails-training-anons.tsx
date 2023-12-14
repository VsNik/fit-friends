import React from 'react';
import { ITraining } from '@fit-friends/shared';
import { Image } from '../../ui/image/image';
import { ButtonLink } from '../../ui/button-link/button-link';
import { getTrainingRoute } from '../../../utils/route';

interface ThumbnailTrainingAnonsProps {
  training: ITraining;
}

export const ThumbnailTrainingAnons: React.FC<ThumbnailTrainingAnonsProps> = (props) => {
  const { training } = props;

  return (
    <div className="special-for-you__item">
      <div className="thumbnail-preview">
        <Image src={training.bgImage} width={452} height={191} className="thumbnail-preview__image" dataTestid='training-bg' />
        
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title" data-testid='training-type'>{training.type}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <ButtonLink text="Подробнее" to={getTrainingRoute(training.id)} className="thumbnail-preview__button" small />
          </div>
        </div>
      </div>
    </div>
  );
};
