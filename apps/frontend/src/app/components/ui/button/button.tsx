import React, { MouseEvent } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  medium?: boolean;
  small?: boolean;
  outlined?: boolean;
  darckBg?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className, medium, small, outlined, type, darckBg, disabled }) => {
  return (
    <button
      className={clsx('btn', className, {
        'btn--medium': medium,
        'btn--small': small,
        'btn--outlined': outlined,
        'btn--dark-bg': darckBg,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
