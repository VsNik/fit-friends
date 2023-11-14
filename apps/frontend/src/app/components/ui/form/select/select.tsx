import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useOutsideClick from '../../../../hooks/use-out-side-click';

interface IOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: IOption[];
  name: string;  
  label?: string;
  selected: string;
  placeholder?: string;
  setSelected: (value: string) => void;
  disabled?: boolean;
  className?: string; 
}

export const Select: React.FC<SelectProps> = (props) => {
  const { options, name, label, selected, setSelected, placeholder, disabled, className } = props;

  const [isOpen, setOpen] = useState(false);
  const selectRef = useRef(null);
  
  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  useOutsideClick(selectRef, () => setOpen(false));

  useEffect(() => {
    clearErrors(name);
    setValue(name, selected);
  }, [selected, setValue, clearErrors, name]);

  const onSetSelected = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div
      {...register(name)}
      className={clsx('custom-select', className, {
        'custom-select--not-selected': !isOpen,
        'is-open': isOpen,
        'is-invalid': errors[name],
        'custom-select--readonly': disabled
      })}
    >
      {errors[name] && <i className="custom-select__error">{errors[name]?.message as string}</i>}

      <span className="custom-select__label">{label}</span>
      <div className="custom-select__placeholder">
        {selected ? options.find((item) => item.value === selected)?.label : placeholder}
      </div>

      <button 
        onClick={() => setOpen(!isOpen)} 
        className="custom-select__button" 
        type="button" 
        aria-label="Выберите одну из опций" 
        ref={selectRef}
        disabled={disabled}
      >
        <span className="custom-select__text" />
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-down" />
          </svg>
        </span>
      </button>

      <ul className="custom-select__list" role="listbox">
        {options.map((item) => (
          <li 
            className="custom-select__item" 
            onClick={() => onSetSelected(item.value)} 
            key={item.value} 
            value={item.value}
          >
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
