import React from 'react';
import { Link } from 'react-router-dom';

interface ForYouItemProps {
  trainingId?: string;
  src: string;
  srcSet?: string;
  type?: string;
}

export const ForYouSliderItem: React.FC<ForYouItemProps> = (props) => {
  const { src, srcSet, type } = props;

  return (
      <div className="special-for-you__item">
        <div className="thumbnail-preview">
          <div className="thumbnail-preview__image">
            <picture>
              <source type={type} srcSet={srcSet} />
              <img src={src} srcSet={srcSet} width="452" height="191" alt="" />
            </picture>
          </div>
          <div className="thumbnail-preview__inner">
            <h3 className="thumbnail-preview__title">crossfit</h3>
            <div className="thumbnail-preview__button-wrapper">
              <Link className="btn btn--small thumbnail-preview__button" to="#">
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
