import React from 'react';
import { Image } from '../ui/image/image';
import { ButtonLink } from '../ui/button-link/button-link';
import { getTrainingRoute } from '../../utils/route';

interface ForYouItemProps {
  trainingId: string;
  src: string;
  type?: string;
}

export const ForYouSliderItem: React.FC<ForYouItemProps> = (props) => {
  const { src, type, trainingId } = props;

  return (
    <div className="special-for-you__item">
      <div className="thumbnail-preview">
        <Image src={src} width={452} height={191} type={type} className="thumbnail-preview__image" />
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">crossfit</h3>
          <div className="thumbnail-preview__button-wrapper">
            <ButtonLink text="Подробнее" to={getTrainingRoute(trainingId)} className="thumbnail-preview__button" small />
          </div>
        </div>
      </div>
    </div>
  );
};
