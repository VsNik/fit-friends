import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserFriendsAction } from '../../../store/users/async-actions';
import { ThumbnailFriend } from '../../thumbnails/thumbnail-friend/thumbnail-friend';
import { Button } from '../../ui/button/button';
import { RouteName } from '../../../constants/route';
import * as usersSelector from '../../../store/users/users-select';
import { Loader } from '../../loader/loader';

interface UserFriendsProps {
  userId: string;
}

export const UserFriends: React.FC<UserFriendsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const friends = useAppSelector(usersSelector.users);
  const isLoading = useAppSelector(usersSelector.isLoading);

  useEffect(() => {
    dispatch(fetchUserFriendsAction(userId))
  }, [dispatch, userId]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="friends-list__wrapper">
      <ButtonFloat text="Назад" icon='arrow-left' className="friends-list__back" onClick={() => navigate(RouteName.Home)} />

      <div className="friends-list__title-wrapper">
        <h1 className="friends-list__title">Мои друзья</h1>
      </div>

      <ul className="friends-list__list">
        {friends?.map((friend) => 
            <ThumbnailFriend key={friend.id} user={friend} />
        )}        
      </ul>

      <div className="show-more friends-list__show-more">
        <Button text='Показать еще' className='show-more__button show-more__button--more' />
        <Button text='Вернуться в начало' className='show-more__button show-more__button--to-top' />
      </div>
    </div>
  );
};
