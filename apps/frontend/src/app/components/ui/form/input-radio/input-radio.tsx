import React from 'react';
import {useFormContext} from "react-hook-form";

interface InputRadioProps {
  label: string;
  name: string;
  value: string;
  isChecked?: boolean;
}

export const InputRadio: React.FC<InputRadioProps> = (props) => {
  const {label, name, value, isChecked} = props;
  const {register} = useFormContext();

  return (
    <div className="custom-toggle-radio__block">
      <label>
      <input
        {...register(name)}
        type="radio"
        name={name}
        value={value}
        defaultChecked={isChecked}
      />
        <span className="custom-toggle-radio__icon" />
        <span className="custom-toggle-radio__label">{label}</span>
      </label>
    </div>
  );
};
