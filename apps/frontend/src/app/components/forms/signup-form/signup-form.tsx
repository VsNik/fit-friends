import React, { useState } from 'react';
import { Input } from '../../ui/form/input/input';
import { Select } from '../../ui/form/select/select';
import { Location, Role } from '@fit-friends/shared';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { RoleBtnRadio } from '../../ui/form/role-btn-radio/role-btn-radio';
import { InputAvatar } from '../../ui/form/input-avatar/input-avatar';

const optionsList = [
  { value: Location.Pionerskaya, text: 'Пионерская' },
  { value: Location.Udelnaya, text: 'Удельная' },
  { value: Location.Zvezdnaya, text: 'Звездная' },
  { value: Location.Sportivnaya, text: 'Спортивная' },
];

export const SignupForm: React.FC = () => {
  const [location, setLocation] = useState({ value: '', text: '' });

  return (
    <form method="get">
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <InputAvatar />
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
          </div>
        </div>
        <div className="sign-up__data">
          <Input label="Имя" name="name" type="text" />
          <Input label="E-mail" name="email" type="email" />
          <Input label="Дата рождения" name="birthday" type="date" />
          <Select optionsList={optionsList} label="Ваша локация" option={location} setOption={setLocation} error="" />
          <Input label="Пароль" name="password" type="password" />

          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              <InputRadio name="sex" label="Мужской" isChecked />
              <InputRadio name="sex" label="Женский" />
              <InputRadio name="sex" label="Неважно" />
            </div>
          </div>
        </div>

        <div className="sign-up__role">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            <RoleBtnRadio role={Role.Coach} isChecked />
            <RoleBtnRadio role={Role.User} />
          </div>
        </div>

        <div className="sign-up__checkbox">
          <label>
            <input type="checkbox" value="user-agreement" name="user-agreement" />
            <span className="sign-up__checkbox-icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#arrow-check" />
              </svg>
            </span>
            <span className="sign-up__checkbox-label">
              Я соглашаюсь с <span>политикой конфиденциальности</span> компании
            </span>
          </label>
        </div>

        <button className="btn sign-up__button" type="submit">
          Продолжить
        </button>
      </div>
    </form>
  );
};
