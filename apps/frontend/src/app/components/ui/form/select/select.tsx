import React, { useState } from 'react';

interface IOption {
  value: string;
  text: string;
}

interface SelectProps {
  optionsList: IOption[];
  label?: string;
  option: IOption;
  setOption: (item: IOption) => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = (props) => {
  const { optionsList, label, option, setOption, error } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onSetSelected = (item: IOption) => {
    setOption(item);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${error && !option.text && 'is-invalid'} ${isOpen ? 'is-open' : 'custom-select--not-selected'}`}>
      {error && !option.text && <i className="custom-select__error">{error}</i>}
      <span className="custom-select__label">Ваша локация</span>
      <div className="custom-select__placeholder">{option.text || label}</div>

      <button onClick={() => setIsOpen(!isOpen)} className="custom-select__button" type="button" aria-label="Выберите одну из опций">
        <span className="custom-select__text" />
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-down" />
          </svg>
        </span>
      </button>

      <ul className="custom-select__list" role="listbox">
        {optionsList.map((item) => (
          <li className="custom-select__item" onClick={() => onSetSelected(item)} key={item.value} value={item.value}>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
