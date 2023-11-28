import React, { useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserFriendsAction } from '../../../store/users/async-actions';
import { ThumbnailFriend } from '../../thumbnails/thumbnail-friend/thumbnail-friend';
import { Loader } from '../../loader/loader';
import { ButtonShowMore } from '../../ui/button-show-more/button-show-more';
import { LoadStatus } from '../../../constants/common';
import * as usersSelector from '../../../store/users/users-select';

interface UserFriendsProps {
  userId: string;
}

export const UserFriends: React.FC<UserFriendsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(usersSelector.users);
  const loadStatus = useAppSelector(usersSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  useEffect(() => {
    dispatch(fetchUserFriendsAction(userId));
  }, [dispatch, userId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <ul className="friends-list__list">
        {friends?.map((friend) => (
          <ThumbnailFriend key={friend.id} user={friend} />
        ))}
      </ul>

      <ButtonShowMore className="friends-list__show-more" />
    </Fragment>
  );
};
