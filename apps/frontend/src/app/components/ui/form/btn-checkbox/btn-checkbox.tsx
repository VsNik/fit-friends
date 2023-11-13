import React from 'react';
import { useFormContext } from 'react-hook-form';

interface BtnCheckboxProps {
  name: string;
  value: string;
  label: string;
}
export const BtnCheckbox: React.FC<BtnCheckboxProps> = ({ name, value, label }) => {
  const { register } = useFormContext();
  return (
    <div className="btn-checkbox">
      <label>
        <input {...register(name)} className="visually-hidden" type="checkbox" name={name} value={value} />
        <span className="btn-checkbox__btn">{label}</span>
      </label>
    </div>
  );
};
