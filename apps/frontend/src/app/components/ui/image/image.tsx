import React from 'react';

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  type?: string;
  alt?: string;
  className?: string;
  dataTestid?: string;
}

export const Image: React.FC<ImageProps> = (props) => {
  const { src, width, height, type, alt, className, dataTestid } = props;

  return (
    <div className={className}>
      <picture>
        <source type={type} srcSet={src} />
        <img src={src} srcSet={src} width={width} height={height} alt={alt} data-testid={dataTestid} />
      </picture>
    </div>
  );
};
