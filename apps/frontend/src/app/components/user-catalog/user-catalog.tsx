import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ThumbnailUserCard } from '../thumbnails/thumbnail-user-card/thumbnail-user-card';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import * as usersSelector from '../../store/users/users-select';

export const UserCatalog: React.FC = () => {
  const users = useAppSelector(usersSelector.users);

  return (
    <div className="users-catalog">
      <ul className="users-catalog__list">
        {users?.map((user) => (
          <li key={user.id} className="users-catalog__item">
            <ThumbnailUserCard user={user} />
          </li>
        ))}
      </ul>
      <ButtonShowMore className='users-catalog__show-more' />
    </div>
  );
};
