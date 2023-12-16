import { SortDirection } from '@fit-friends/shared';
import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

interface ButtonsSortingRoleProps {
  direction: SortDirection | null;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  dataTestId?: string;
}

export const ButtonsSortingRole: React.FC<ButtonsSortingRoleProps> = (props) => {
  const { onChange, disabled, className, direction, dataTestId } = props;

  return (
    <div className={clsx('btn-radio-sort', className)}>
      <label>
        <input type="radio" name="direction" value={SortDirection.Desc} onChange={onChange} checked={direction === SortDirection.Desc} disabled={disabled} data-testid={dataTestId} />
        <span className="btn-radio-sort__label">Тренеры</span>
      </label>
      <label>
        <input type="radio" name="direction" value={SortDirection.Asc} onChange={onChange} checked={direction === SortDirection.Asc} disabled={disabled} data-testid={dataTestId} />
        <span className="btn-radio-sort__label">Пользователи</span>
      </label>
    </div>
  );
};
