import React from 'react';
import { useFormContext } from 'react-hook-form';

interface BtnCheckboxProps {
  name: string;
  value: string;
  label: string;
  disabled?: boolean;
}
export const BtnCheckbox: React.FC<BtnCheckboxProps> = (props) => {
  const { name, value, label, disabled } = props;
  const { register } = useFormContext();
  return (
    <div className="btn-checkbox">
      <label>
        <input 
          {...register(name)} 
          className="visually-hidden" 
          type="checkbox" 
          name={name} 
          value={value} 
          disabled={disabled} 
        />
        <span className="btn-checkbox__btn">{label}</span>
      </label>
    </div>
  );
};
