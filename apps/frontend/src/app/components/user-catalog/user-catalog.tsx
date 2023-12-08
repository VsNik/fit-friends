import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ThumbnailUserCard } from '../thumbnails/thumbnail-user-card/thumbnail-user-card';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { Loader } from '../loader/loader';
import { CardsOnPage, LoadStatus } from '../../constants/common';
import * as usersSelector from '../../store/users/users-select';

interface UserCatalogProps {
  page: number;
  onShowMore: () => void;
}

export const UserCatalog: React.FC<UserCatalogProps> = ({page, onShowMore}) => {
  const users = useAppSelector(usersSelector.users);
  const total = useAppSelector(usersSelector.total);
  const loadStatus = useAppSelector(usersSelector.loadStatus);
  
  const isLoading = loadStatus === LoadStatus.Loading;
  const pages = Math.ceil(total / CardsOnPage.Users);

  return (
    <div className="users-catalog">
      {isLoading && <Loader />}

      <ul className="users-catalog__list">
        {users?.map((user) => (
          <li key={user.id} className="users-catalog__item">
            <ThumbnailUserCard user={user} />
          </li>
        ))}
      </ul>

      {page < pages &&
        <ButtonShowMore className='users-catalog__show-more' onClick={onShowMore} />
      }      
    </div>
  );
};
