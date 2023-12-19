import React from 'react';
import {useFormContext} from "react-hook-form";
import { Role } from '@fit-friends/shared';

interface RoleBtnRadioProps {
  role: Role;
  isChecked?: boolean;
  dataTestId?: string;
}

export const RoleBtnRadio: React.FC<RoleBtnRadioProps> = ({ role, isChecked, dataTestId }) => {
  const {register} = useFormContext();

  return (
    <div className="role-btn">
      <label>
        <input
          {...register('role')}
          className="visually-hidden"
          type="radio"
          name="role"
          value={role}
          defaultChecked={isChecked}
          data-testid={dataTestId}
        />
        <span className="role-btn__icon">
          <svg width="12" height="13" aria-hidden="true">
            {role === Role.Coach 
              ? <use xlinkHref="/assets/img/sprite.svg#icon-cup" /> 
              : <use xlinkHref="/assets/img/sprite.svg#icon-weight" />
            }
          </svg>
        </span>
        <span className="role-btn__btn">
          {role === Role.Coach 
            ? 'Я хочу тренировать' 
            : 'Я хочу тренироваться'
          }
        </span>
      </label>
    </div>
  );
};
