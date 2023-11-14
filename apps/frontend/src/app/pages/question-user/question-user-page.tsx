import React from 'react';
import { AuthLayout } from '../../components/layouts/auth-layout';
import { QuestionUserForm } from '../../components/forms/question-user-form/question-user-form';

export const QuestionUserPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <QuestionUserForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
