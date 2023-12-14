import React from 'react';
import { TopMenu } from './top-menu/top-menu';
import { Search } from './search/search';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <span className="header__logo" data-testid='header-logo'>
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#logo" />
          </svg>
        </span>

        <TopMenu />
        <Search />
      </div>
    </header>
  );
};
