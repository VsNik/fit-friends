import React from 'react';
import { Checkbox } from '../form/checkbox/checkbox';
import { TrainingType } from '@fit-friends/shared';

interface CheckTypesProps {
    name: string;
    disabled?: boolean;
}

export const CheckTypes: React.FC<CheckTypesProps> = ({name, disabled}) => {

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <ul className="gym-catalog-form__check-list">
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Yoga} 
            label="йога" 
            disabled={disabled}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Power} label="силовые" disabled={disabled} />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Crossfit} label="кроссфит" disabled={disabled} />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Boxing} label="бокс" disabled={disabled} />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Beg} label="бег" disabled={disabled} />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Aerobic} label="аэробика" disabled={disabled} />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Pilates} label="пилатес" disabled={disabled} />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox name={name} value={TrainingType.Stretching} label="стрейчинг" disabled={disabled} />
        </li>
      </ul>
    </div>
  );
};
