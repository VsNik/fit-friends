import React from 'react';
import { Button } from '../../ui/button/button';
import { Checkbox } from '../../ui/form/checkbox/checkbox';

export const UserCardForm: React.FC = () => {
  return (
    <form className="user-card-coach__training-form">
      <Button text="Хочу персональную тренировку" className="user-card-coach__btn-training" />

      <div className="user-card-coach__training-check">
        <Checkbox label="Получать уведомление на почту о новой тренировке" name="user-agreement" value="user-agreement-1" />
      </div>
    </form>
  );
};
