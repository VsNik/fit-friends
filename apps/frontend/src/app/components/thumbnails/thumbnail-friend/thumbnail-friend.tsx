import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IInvitation, IUser, InviteStatus, Role } from '@fit-friends/shared';
import { Button } from '../../ui/button/button';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { getUserLocation } from '../../../utils/helpers';
import { getUserRoute } from '../../../utils/route';
import { ThumbnailReadyStatus } from '../thumbnail-ready-status/thumbnail-ready-status';
import { Avatar } from '../../ui/avatar/avatar';
import { ThumbnailInviteButton } from '../thumbnail-nvite-button/thumbnail-nvite-button';
import { useAppDispatch } from '../../../store/hooks';
import { changeInviteStatusAction, createInvitationAction } from '../../../store/invitations/async-action';
import clsx from 'clsx';

interface ThumbnailFriendProps {
  authId: string;
  authRole: Role;
  user: IUser;
  invitations?: IInvitation[];
}

export const ThumbnailFriend: React.FC<ThumbnailFriendProps> = ({ user, invitations, authId, authRole }) => {
  const dispatch = useAppDispatch();
  const location = getUserLocation(user.location);
  const navigation = useNavigate();

  const authInvite = invitations?.find((item) => 
    item.initiatorId === authId && 
    item.toUserId === user.id
  );

  const invite = invitations?.find((item) => 
    item.initiatorId === user.id && 
    item.toUserId === authId && 
    item.status === InviteStatus.Waiting)
  ;

  const handleAccept = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    console.log('ACCEPTED');
    if (invite) {
      dispatch(changeInviteStatusAction({ invitationId: invite.id!, status: InviteStatus.Accepted }));
    }
  };

  const handleReject = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    console.log('rejected');
    if (invite) {
      dispatch(changeInviteStatusAction({ invitationId: invite.id!, status: InviteStatus.Rejected }));
    }
  };

  const handleInviteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    dispatch(createInvitationAction(user.id));
  };

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend" onClick={() => navigation(getUserRoute(user.id))}>
        <div
          className={clsx('thumbnail-friend__info', {
            'thumbnail-friend__info--theme-light': user.role === Role.User,
            'thumbnail-friend__info--theme-dark': user.role === Role.Coach,
          })}
        >
          <div className="thumbnail-friend__image-status">
            <Avatar src={user.avatar} width={78} height={78} className="thumbnail-friend__image" />
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{user.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">{location.title}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {user.trainingType?.map((type) => (
              <li key={type}>
                <Hashtag title={type} className="thumbnail-friend__hashtag" />
              </li>
            ))}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <ThumbnailReadyStatus user={user} />

            {(user.role === Role.User && authRole === Role.User) && (
              <ThumbnailInviteButton 
                user={user} 
                onClick={handleInviteClick} 
                disabled={!!invite} 
              />
            )}
          </div>
        </div>

        {invite && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <Button text="Принять" className="thumbnail-friend__button" onClick={handleAccept} darckBg medium />
              <Button text="Отклонить" className="thumbnail-friend__button" onClick={handleReject} darckBg outlined medium />
            </div>
          </div>
        )}
      </div>
    </li>
  );
};
