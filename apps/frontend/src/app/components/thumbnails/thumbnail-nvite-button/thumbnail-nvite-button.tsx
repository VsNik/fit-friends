import React, {MouseEvent} from 'react';
import clsx from 'clsx';
import { IUser } from '@fit-friends/shared';

interface ThumbnailInviteButtonProps {
  user: IUser;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ThumbnailInviteButton: React.FC<ThumbnailInviteButtonProps> = ({ user, onClick, disabled }) => {
  return (
    <button
      className={clsx('thumbnail-friend__invite-button', {
        'is-disabled': !user.ready || disabled,
      })}
      type="button"
      onClick={onClick}
      disabled={!user.ready || disabled}
      data-testid='friend-invite-button'
    >
      <svg width="43" height="46" aria-hidden="true" focusable="false">
        <use xlinkHref="/assets/img/sprite.svg#icon-invite"></use>
      </svg>
      <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
    </button>
  );
};
