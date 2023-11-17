import React from 'react';
import clsx from 'clsx';

interface HashtagProps {
  title: string | number;
  white?: boolean;
  className?: string;
}

export const Hashtag: React.FC<HashtagProps> = ({ title, white, className }) => {
  return (
    <div className={clsx('hashtag', className, { 'hashtag--white': white })}>
      <span>#{title}</span>
    </div>
  );
};
