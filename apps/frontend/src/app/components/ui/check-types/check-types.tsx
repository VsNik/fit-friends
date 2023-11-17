import React from 'react';
import { Checkbox } from '../form/checkbox/checkbox';
import { TrainingType } from '@fit-friends/shared';
import { useAppDispatch } from '../../../store/hooks';
import { setTypeAction } from '../../../store/trainings/trainings-slice';

interface CheckTypesProps {
    name: string;
    typeList?: TrainingType[];
    disabled?: boolean;
}

export const CheckTypes: React.FC<CheckTypesProps> = ({name, disabled, typeList}) => {
  const dispatch = useAppDispatch();
  const handleChangeTypes = (type: TrainingType) => 
    dispatch(setTypeAction(type));

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
            checked={typeList?.includes(TrainingType.Yoga)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Power} 
            label="силовые" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Power)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Crossfit} 
            label="кроссфит" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Crossfit)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Boxing} 
            label="бокс" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Boxing)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Beg} 
            label="бег" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Beg)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Aerobic} 
            label="аэробика" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Aerobic)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Pilates} 
            label="пилатес" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Pilates)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
        <li className="gym-catalog-form__check-list-item">
          <Checkbox 
            name={name} 
            value={TrainingType.Stretching} 
            label="стрейчинг" 
            disabled={disabled} 
            checked={typeList?.includes(TrainingType.Stretching)}
            onChange={(evt) => handleChangeTypes(evt.target.value as TrainingType)}
          />
        </li>
      </ul>
    </div>
  );
};
