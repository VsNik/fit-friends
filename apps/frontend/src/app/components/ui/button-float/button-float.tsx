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
  disabled?: boolean;
  dataTestId?: string;
}

export const ButtonFloat: React.FC<ButtonFloatProps> = (props) => {
  const {text, icon, onClick, className, type = 'button', light, underline, iconLeft, form, disabled, dataTestId } = props;

  return (
    <button
      className={clsx('btn-flat', className, {
        'btn-flat--light': light,
        'btn-flat--underlined': underline,
      })}
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {iconLeft && <span>{text}</span>}
      <svg width="12" height="12" aria-hidden="true">
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
      </svg>
      {!iconLeft && <span>{text}</span>}
    </button>
  );
};
