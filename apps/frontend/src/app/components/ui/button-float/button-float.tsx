import React from 'react';
import clsx from 'clsx';

interface ButtonFloatProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  light?: boolean;
  underline?: boolean;
  iconLeft?: boolean;
  type?: "button" | "submit";
  form?: string;
}

export const ButtonFloat: React.FC<ButtonFloatProps> = (props) => {
  const {text, icon, onClick, className, type, light, underline, iconLeft, form } = props;

  return (
    <button
      className={clsx('btn-flat', className, {
        'btn-flat--light': light,
        'btn-flat--underlined': underline,
      })}
      type={type}
      form={form}
      onClick={onClick}
    >
      {iconLeft && <span>{text}</span>}
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
      </svg>
      {!iconLeft && <span>{text}</span>}
      {/* <span>{text}</span> */}
    </button>
  );
};
