import React from 'react';
import { Link } from 'react-router-dom';
import { RouteName } from '../../app';
import './styles.css';

export const NotFound: React.FC = () => {

  return (
    <div className="wrapper">
      <main>
        <div className="intro">
          <div className="intro__background">
            <picture>
              <source type="image/webp" srcSet="/assets/img/content/sitemap/background.webp, /assets/img/content/sitemap/background@2x.webp 2x" />
              <img
                src="/assets/img/content/sitemap/background.webp"
                srcSet="/assets/img/content/sitemap/background@2x.jpg 2x"
                width="1440"
                height="1024"
                alt="Фон с бегущей девушкой"
              />
            </picture>
          </div>
          <div className="intro__wrapper">
            <svg className="intro__icon" width="60" height="60" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg/#icon-logotype" />
            </svg>
            <div className="intro__title-logo">
              <div className="not-found">
                <h1>Page Not Found</h1>
              </div>
            </div>
            <div className="intro__buttons">
              <Link className="not-found__link" to={RouteName.Home}>
                Домашняя страница
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
