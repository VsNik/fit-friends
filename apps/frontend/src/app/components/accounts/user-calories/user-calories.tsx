import React from 'react';

interface UserCaloriesProps {
    calories: number;
}

export const UserCalories: React.FC<UserCaloriesProps> = ({calories}) => {
  return (
    <div className="personal-account-user__schedule">
      <form action="#" method="get">
        <div className="personal-account-user__form">
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на день, ккал</span>
              <input type="text" name="schedule-for-the-day" defaultValue={calories} readOnly/>
            </label>
          </div>
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на неделю, ккал</span>
              <input type="text" name="schedule-for-the-week" defaultValue={calories * 7} readOnly/>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
