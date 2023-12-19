import React from 'react';
import { TrainingSortDirection } from '@fit-friends/shared';
import clsx from 'clsx';

interface ButtonSortDirectionProps {
  text: string;
  direction: TrainingSortDirection;
  onClick: () => void;
  active: boolean;
  disabled?: boolean;
  dataTestId?: string;
}

export const ButtonSortDirection: React.FC<ButtonSortDirectionProps> = (props) => {
  const { text, direction, onClick, active, disabled, dataTestId } = props;

  return (
    <button className={clsx('btn-filter-sort', { active: active })} type="button" onClick={onClick} data-testid={dataTestId} disabled={disabled}>
      <span>{text}</span>
      <svg width="16" height="10" aria-hidden="true" data-testid='direct-icon'>
        {direction === TrainingSortDirection.Desc ? (
          <use xlinkHref="/assets/img/sprite.svg#icon-sort-up" />
        ) : (
          <use xlinkHref="/assets/img/sprite.svg#icon-sort-down" />
        )}
      </svg>
    </button>
  );
};
