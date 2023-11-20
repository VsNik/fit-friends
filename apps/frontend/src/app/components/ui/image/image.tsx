import React from 'react';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { src, width, height, className } = props;

  return (
    <div className={className}>
      <picture>
        <source srcSet={src} />
        <img src={src} srcSet={src} width={width} height={height} alt="" />
      </picture>
    </div>
  );
};
