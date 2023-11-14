import React from 'react';
import { AuthLayout } from '../../components/layouts/auth-layout';
import { QuestionCoachForm } from '../../components/forms/question-coach-form/question-coach-form';

export const QuestionCoachPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <QuestionCoachForm />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
