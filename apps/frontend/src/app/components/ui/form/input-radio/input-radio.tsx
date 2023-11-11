import React from 'react';

interface InputRadioProps {
  label: string;
  name: string;
  isChecked?: boolean;
}

export const InputRadio: React.FC<InputRadioProps> = ({ label, name, isChecked }) => {
  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input type="radio" name={name} defaultChecked={isChecked} />
        <span className="custom-toggle-radio__icon" />
        <span className="custom-toggle-radio__label">{label}</span>
      </label>
    </div>
  );
};
