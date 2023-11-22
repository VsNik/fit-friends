import React from 'react';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  type?: string;
  alt?: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { src, width, height, type, alt, className } = props;

  return (
    <div className={className}>
      <picture>
        <source type={type} srcSet={src} />
        <img src={src} srcSet={src} width={width} height={height} alt={alt} />
      </picture>
    </div>
  );
};
