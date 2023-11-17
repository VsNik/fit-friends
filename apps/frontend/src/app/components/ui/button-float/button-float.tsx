import React from 'react';
import clsx from 'clsx';

interface ButtonFloatProps {
  text: string;
  icon?: string;
  className?: string;
  light?: boolean;
  underline?: boolean;
  type?: "button" | "submit";
}

export const ButtonFloat: React.FC<ButtonFloatProps> = (props) => {
  const {text, icon, className, type, light, underline } = props;

  return (
    <button
      className={clsx('btn-flat', className, {
        'btn-flat--light': light,
        'btn-flat--underlined': underline,
      })}
      type={type}
    >
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
      </svg>
      <span>{text}</span>
    </button>
  );
};
