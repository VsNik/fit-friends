import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  className?: string;
  medium?: boolean;
  small?: boolean;
  outlined?: boolean;
  darckBg?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({ text, className, medium, small, outlined, type, darckBg, disabled }) => {
  return (
    <button
      className={clsx('btn', className, {
        'btn--medium': medium,
        'btn--small': small,
        'btn--outlined': outlined,
        'btn--dark-bg': darckBg,
      })}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
