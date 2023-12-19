import React from 'react';
import { Image } from '../../ui/image/image';

interface ThumbnailBannerProps {
    image: string;
    text: string;
}

export const ThumbnailBanner: React.FC<ThumbnailBannerProps> = ({image, text}) => {
  return (
    <div className="thumbnail-spec-gym">
      <Image src={image} className="thumbnail-spec-gym__image" />
      
      <div className="thumbnail-spec-gym__header">
        <h3 className="thumbnail-spec-gym__title">{text}</h3>
      </div>
    </div>
  );
};
