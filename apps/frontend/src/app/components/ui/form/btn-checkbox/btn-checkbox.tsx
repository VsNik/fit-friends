import React from 'react';
import { useFormContext } from 'react-hook-form';

interface BtnCheckboxProps {
  name: string;
  value: string;
  label: string;
  disabled?: boolean;
  dataTestId?: string;
}
export const BtnCheckbox: React.FC<BtnCheckboxProps> = (props) => {
  const { name, value, label, disabled, dataTestId } = props;
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
          data-testid={dataTestId}
        />
        <span className="btn-checkbox__btn">{label}</span>
      </label>
    </div>
  );
};
