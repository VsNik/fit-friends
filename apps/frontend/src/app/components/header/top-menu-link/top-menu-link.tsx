import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface TopMenuLinkProps {
  to: string;
  title: string;
  icon: string;
  isActive?: boolean;
}

export const TopMenuLink: React.FC<TopMenuLinkProps> = (props) => {
  const { to, title, icon, isActive } = props;

  return (
    <Link className={clsx('main-nav__link', { 'is-active': isActive })} to={to} aria-label={title} title={title}>
      <svg width="18" height="18" aria-hidden="true">
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
      </svg>
    </Link>
  );
};
