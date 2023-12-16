import React from 'react';
import { AuthLayout } from '../../components/layouts/auth-layout';
import { SignupForm } from '../../components/forms/signup-form/signup-form';

export const SignupPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="popup-form popup-form--sign-up" data-testid='signup-page-component'>
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
