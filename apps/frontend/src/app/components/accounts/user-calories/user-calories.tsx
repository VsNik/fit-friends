import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { Loader } from '../../loader/loader';
import { LoadStatus } from '../../../constants/common';
import * as userSelector from '../../../store/user/user-select';

interface UserCaloriesProps {
    calories: number;
}

export const UserCalories: React.FC<UserCaloriesProps> = ({calories}) => {
  const loadStatus = useAppSelector(userSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  return (
    <div className="personal-account-user__schedule" data-testid='user-calories-block'>
      {isLoading && <Loader />}
      <form>
        <div className="personal-account-user__form">
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на день, ккал</span>
              <input type="text" name="schedule-for-the-day" data-testid='calory-input-element' defaultValue={calories} readOnly disabled={isLoading}/>
            </label>
          </div>
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на неделю, ккал</span>
              <input type="text" name="schedule-for-the-week" data-testid='summ-calory-input-element' defaultValue={calories && calories * 7} readOnly disabled={isLoading}/>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
