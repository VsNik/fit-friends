import React from 'react';
import { Input } from '../../ui/form/input/input';

export const LoginForm: React.FC = () => {
  return (
    <form>
      <div className="sign-in">
        <Input
            className="sign-in__input"
            label="E-mail" 
            name="email" 
            type="email" 
        />

        <Input
            className="sign-in__input"
            label="Пароль" 
            name="password" 
            type="password" 
        />

        <button className="btn sign-in__button" type="submit">
          Продолжить
        </button>
      </div>
    </form>
  );
};
