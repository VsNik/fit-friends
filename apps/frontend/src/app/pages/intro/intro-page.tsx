import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button/button';
import { RouteName } from '../../constants/route';

export const IntroPage: React.FC = () => {
  const navigation = useNavigate();

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
              <picture>
                <source type="image/webp" srcSet="/assets/img/content/sitemap/title-logo.webp, /assets/img/content/sitemap/title-logo@2x.webp 2x" />
                <img
                  src="/assets/img/content/sitemap/title-logo.png"
                  srcSet="/assets/img/content/sitemap/title-logo@2x.png 2x"
                  width="934"
                  height="455"
                  alt="Логотип Fit Friends"
                />
              </picture>
            </div>
            <div className="intro__buttons">
              <Button text='Регистрация' className="intro__button" onClick={() => navigation(RouteName.Signup)} />

              <p className="intro__text">
                Есть аккаунт?
                <Link className="intro__link" to={RouteName.Login}>
                  Вход
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
