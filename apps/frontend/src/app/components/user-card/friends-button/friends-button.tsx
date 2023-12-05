import { IUser, Role } from '@fit-friends/shared';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Button } from '../../ui/button/button';
import { removeFriendAction, toFriendAction } from '../../../store/user/async-actions';
import * as authSelector from '../../../store/auth/auth-select';
import clsx from 'clsx';

interface FriendsButtonProps {
  user: IUser;
  disabled?: boolean;
}

export const FriendsButton: React.FC<FriendsButtonProps> = ({ user, disabled }) => {
  const dispatch = useAppDispatch();
  const authRole = useAppSelector(authSelector.authRole);

  const isDisabled = (authRole === Role.Coach && !user.isFollow) || disabled;

  const toggleFriend = () => {
    if (authRole === Role.User) {
      dispatch(toFriendAction(user.id));
    } else {
      dispatch(removeFriendAction(user.id));
    }
  };

  return (
    <Button
      text={`${user.isFollow ? 'Удалить из друзей' : 'Добавить в друзья'}`}
      className={clsx("user-card__btn")}
      onClick={toggleFriend}
      disabled={isDisabled}
      outlined={user.isFollow}
    />
  );
};
