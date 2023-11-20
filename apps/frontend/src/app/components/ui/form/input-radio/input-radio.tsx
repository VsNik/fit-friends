import React, { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputRadioProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  isChecked?: boolean;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const InputRadio: React.FC<InputRadioProps> = (props) => {
  const { label, name, value, checked, isChecked, onChange, disabled } = props;
  const formContext = useFormContext();

  const options = {
    type: 'radio',
    name,
    value,
    onChange,
    checked,
    defaultChecked: isChecked,
    disabled,
  };

  return (
    <div className="custom-toggle-radio__block">
      <label>
        {formContext 
          ? <input {...options} {...formContext.register(name)} /> 
          : <input {...options} />
        }
        <span className="custom-toggle-radio__icon" />
        <span className="custom-toggle-radio__label">{label}</span>
      </label>
    </div>
  );
};
