import React from 'react';
import { Link } from 'react-router-dom';

export const Search: React.FC = () => {
  return (
    <div className="search">
      <form action="#" method="get">
        <label>
          <span className="search__label">Поиск</span>
          <input type="search" name="search" />
          <svg className="search__icon" width="20" height="20" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-search" />
          </svg>
        </label>
        <ul className="search__list">
          <li className="search__item">
            <Link className="search__link" to="#">
              Бокс
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link is-active" to="#">
              Бег
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Аэробика
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
          <li className="search__item">
            <Link className="search__link" to="#">
              Text
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};
