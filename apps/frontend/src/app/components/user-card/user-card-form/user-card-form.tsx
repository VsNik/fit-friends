import React from 'react';
import { Button } from '../../ui/button/button';
import { Checkbox } from '../../ui/form/checkbox/checkbox';
import { IUser } from '@fit-friends/shared';
import { subscribeAction } from '../../../store/user/async-actions';
import { useAppDispatch } from '../../../store/hooks';

interface UserCardFormProps {
  user: IUser;
}

export const UserCardForm: React.FC<UserCardFormProps> = ({user}) => {
  const dispatch = useAppDispatch();
  
  const handleSubscribe = () => {
    dispatch(subscribeAction(user.id));
  }

  return (
    <form className="user-card-coach__training-form">
      {(user.personalTraining && user.isFollow) &&
        <Button text="Хочу персональную тренировку" className="user-card-coach__btn-training" />
      }      

      <div className="user-card-coach__training-check">
        <Checkbox 
          label="Получать уведомление на почту о новой тренировке" 
          name="subscribe" 
          checked={Boolean(user.isSubscribe)}
          onChange={handleSubscribe} 
        />
      </div>
    </form>
  );
};
