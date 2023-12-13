import React, { useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchCoachFriendsAction, loadMoreCoachFriendsAction } from '../../../store/users/async-actions';
import { ThumbnailFriend } from '../../thumbnails/thumbnail-friend/thumbnail-friend';
import { Loader } from '../../loader/loader';
import { ButtonShowMore } from '../../ui/button-show-more/button-show-more';
import { CardsOnPage, LoadStatus } from '../../../constants/common';
import { fetchFromInvitesAction } from '../../../store/invitations/async-action';
import * as usersSelector from '../../../store/users/users-select';
import * as invitationsSelector from '../../../store/invitations/invitations-select';
import { Role } from '@fit-friends/shared';
import { getFriendsQuery } from '../../../utils/query-string';

interface CoachFriendsProps {
  userId: string;
}

export const CoachFriends: React.FC<CoachFriendsProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(usersSelector.users);
  const invitations = useAppSelector(invitationsSelector.invitations);
  const loadStatus = useAppSelector(usersSelector.loadStatus);
  const page = useAppSelector(usersSelector.page);
  const total = useAppSelector(usersSelector.total);
  const isLoading = loadStatus === LoadStatus.Loading;

  const pages = Math.ceil(total / CardsOnPage.Friends);

  useEffect(() => {
    dispatch(fetchCoachFriendsAction(getFriendsQuery()));
    dispatch(fetchFromInvitesAction());
  }, [dispatch]);

  const handleLoadMoreClick = () => {
    dispatch(loadMoreCoachFriendsAction(getFriendsQuery(page + 1)));
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <ul className="friends-list__list" data-testid='coach-friends'>
        {friends?.map((friend) => (
          <ThumbnailFriend key={friend.id} authId={userId} user={friend} invitations={invitations} authRole={Role.Coach} />
        ))}
      </ul>

      {page < pages &&
        <ButtonShowMore className="friends-list__show-more"  onClick={handleLoadMoreClick}/>
      }      
    </Fragment>
  );
};
