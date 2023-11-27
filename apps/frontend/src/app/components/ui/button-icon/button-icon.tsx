import React from 'react';
import { clsx } from 'clsx';

interface ButtonIconProps {
  icon: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  outline?: boolean;
  big?: boolean;
}

export const ButtonIcon: React.FC<ButtonIconProps> = (props) => {
  const { icon, width, height, onClick, disabled, className, outline, big } = props;

  return (
    <button
      className={clsx('btn-icon', className, {
        'btn-icon--outlined': outline,
        'btn-icon--big': big,
      })}
      type="button"
      aria-label="previous"
      onClick={onClick}
      disabled={disabled}
    >
      <svg width={width ?? 16} height={height ?? 14} aria-hidden="true">
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
      </svg>
    </button>
  );
};
