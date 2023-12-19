import React from 'react';
import { Role } from '@fit-friends/shared';
import { useAppSelector } from '../../store/hooks';
import { AuthLayout } from '../../components/layouts/auth-layout/auth-layout';
import { QuestionUserForm } from '../../components/forms/question-user-form/question-user-form';
import { QuestionCoachForm } from '../../components/forms/question-coach-form/question-coach-form';
import * as authSelector from '../../store/auth/auth-select';

export const QuestionPage: React.FC = () => {
  const authRole = useAppSelector(authSelector.authRole);

  return (
    <AuthLayout>
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">

              {authRole === Role.User && 
                <QuestionUserForm />
              }
              
              {authRole === Role.Coach && 
                <QuestionCoachForm />
              }

            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
