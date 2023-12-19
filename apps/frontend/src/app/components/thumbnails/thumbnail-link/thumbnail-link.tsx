import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ThumbnailLinkProps {
  text: string;
  to: string;
  icon?: string;
  dark?: boolean;
  className?: string;
}

export const ThumbnailLink: React.FC<ThumbnailLinkProps> = (props) => {
  const { text, to, icon, dark, className } = props;

  return (
    <Link
      className={clsx('thumbnail-link', className, {
        'thumbnail-link--theme-light': !dark,
        'thumbnail-link--theme-dark': dark,
      })}
      to={to}
    >
      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
        <svg width="30" height="26" aria-hidden="true">
          <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
        </svg>
      </div>
      <span className="thumbnail-link__text">{text}</span>
    </Link>
  );
};
