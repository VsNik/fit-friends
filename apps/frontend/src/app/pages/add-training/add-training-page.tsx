import React from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { AddTrainingForm } from '../../components/forms/add-training-form/add-training-form';

export const AddTrainingPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="popup-form popup-form--create-training">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Создание тренировки</h1>
            </div>
            <div className="popup-form__form">
              <AddTrainingForm />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
