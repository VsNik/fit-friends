import React from 'react';
import { AuthLayout } from '../../components/layouts/auth-layout';
import { LoginForm } from '../../components/forms/login-form/login-form';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
