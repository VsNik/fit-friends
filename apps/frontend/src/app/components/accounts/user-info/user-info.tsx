import React, { useState } from 'react';
import clsx from 'clsx';
import { UserInfoForm } from '../../forms/user-info-form/user-info-form';
import { CoachType } from '@fit-friends/shared';

interface UserInfoProps {
  user: CoachType;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [isEditable, setEditable] = useState(false);
  
  return (
    <section className={clsx(isEditable ? 'user-info-edit' : 'user-info')}>
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="avatar" accept="image/png, image/jpeg" disabled={!isEditable} />
            <span className="input-load-avatar__avatar">
              <img src={user.avatar} width="98" height="98" alt="user avatar" />
            </span>
          </label>
        </div>

        {isEditable && (
          <div className="user-info-edit__controls">
            <button className="user-info-edit__control-btn" aria-label="обновить">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-change" />
              </svg>
            </button>
            <button className="user-info-edit__control-btn" aria-label="удалить">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-trash" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <UserInfoForm user={user} isEditable={isEditable} setEditable={setEditable} />
    </section>
  );
};
