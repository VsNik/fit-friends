import React, {ReactNode} from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <div className="wrapper">
      <main>
        <div className="background-logo" data-testid='auth-layout-component'>
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#logo-big" />
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-logotype" />
          </svg>
        </div>

        { children }

      </main>
    </div>
  );
}
