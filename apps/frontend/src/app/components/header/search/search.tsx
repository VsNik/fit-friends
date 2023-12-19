import React from 'react';

export const Search: React.FC = () => {
  return (
    <div className="search" data-testid='search-component'>
      <form action="#" method="get">
        <label>
          <span className="search__label">Поиск</span>
          <input type="search" name="search" />
          <svg className="search__icon" width="20" height="20" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-search" />
          </svg>
        </label>
        <ul className="search__list"></ul>
      </form>
    </div>
  );
};
