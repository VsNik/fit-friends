import React from "react";
import { Link } from "react-router-dom";

interface UserCardLabelProps {
    onOpenMap?: () => void;
    position: string;
}

export const UserCardLabel: React.FC<UserCardLabelProps> = ({onOpenMap, position}) => {  
    return (
        <div className="user-card__label">
        <Link to="#" onClick={onOpenMap}>
          <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-location" />
          </svg>
          <span>{position}</span>
        </Link>
      </div>
    );
}