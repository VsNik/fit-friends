import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface ButtonLinkProps {
  text: string;
  to: string;
  className?: string;
  medium?: boolean;
  small?: boolean;
  outlined?: boolean;
  darckBg?: boolean;
}

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const { text, to, className, medium, small, outlined, darckBg } = props;

  return (
    <Link
      className={clsx('btn', className, {
        'btn--medium': medium,
        'btn--small': small,
        'btn--outlined': outlined,
        'btn--dark-bg': darckBg,
      })}
      to={to}
    >
      {text}
    </Link>
  );
};
