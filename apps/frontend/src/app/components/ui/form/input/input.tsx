import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  className?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const {label, type, name, className} = props;

  return (
    <div className={`custom-input ${className ?? ''}`}>
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
          <input type={type} name={name}/>
        </span>
        {/* {errors?.email && <i className="custom-input__error">{errors.email.message}</i>} */}
      </label>
    </div>
  );
}