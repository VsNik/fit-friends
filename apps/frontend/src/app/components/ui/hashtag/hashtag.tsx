import React from 'react';
import clsx from 'clsx';

interface HashtagProps {
  title: string | number;
  white?: boolean;
  className?: string;
  dataTestId?: string;
}

export const Hashtag: React.FC<HashtagProps> = ({ title, white, className, dataTestId }) => {
  return (
    <div className={clsx('hashtag', className, { 'hashtag--white': white })}>
      <span data-testid={dataTestId}>#{title}</span>
    </div>
  );
};
