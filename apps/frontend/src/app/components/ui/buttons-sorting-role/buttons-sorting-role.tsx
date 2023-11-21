import { Role } from '@fit-friends/shared';
import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

interface ButtonsSortingRoleProps {
  sorting: Role | null;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const ButtonsSortingRole: React.FC<ButtonsSortingRoleProps> = (props) => {
  const { sorting, onChange, disabled, className } = props;

  return (
    <div className={clsx('btn-radio-sort', className)}>
      <label>
        <input type="radio" name="sort" value={Role.Coach} onChange={onChange} checked={sorting === Role.Coach} disabled={disabled} />
        <span className="btn-radio-sort__label">Тренеры</span>
      </label>
      <label>
        <input type="radio" name="sort" value={Role.User} onChange={onChange} checked={sorting === Role.User} disabled={disabled} />
        <span className="btn-radio-sort__label">Пользователи</span>
      </label>
    </div>
  );
};
