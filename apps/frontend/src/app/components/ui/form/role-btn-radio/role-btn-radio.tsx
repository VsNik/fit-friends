import { Role } from '@fit-friends/shared';
import React from 'react';

interface RoleBtnRadioProps {
  role: Role;
  isChecked?: boolean;
}

export const RoleBtnRadio: React.FC<RoleBtnRadioProps> = ({ role, isChecked }) => {
  return (
    <div className="role-btn">
      <label>
        <input className="visually-hidden" type="radio" name="role" value={role} defaultChecked={isChecked} />
        <span className="role-btn__icon">
          <svg width="12" height="13" aria-hidden="true">
            {role === Role.Coach ? <use xlinkHref="/assets/img/sprite.svg#icon-cup" /> : <use xlinkHref="/assets/img/sprite.svg#icon-weight" />}
          </svg>
        </span>
        <span className="role-btn__btn">
          {role === Role.Coach ? 'Я хочу тренировать' : 'Я хочу тренироваться'}
        </span>
      </label>
    </div>
  );
};
