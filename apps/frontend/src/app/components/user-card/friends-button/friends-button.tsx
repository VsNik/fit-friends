import { IUser } from "@fit-friends/shared";
import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { Button } from "../../ui/button/button";
import { toFriendAction } from "../../../store/user/async-actions";

interface FriendsButtonProps {
    user: IUser;
    disabled?: boolean;
}

export const FriendsButton: React.FC<FriendsButtonProps> = ({user, disabled}) => {
    const dispatch = useAppDispatch();

    const toggleFriend = () => {
        dispatch(toFriendAction(user.id));
      }

    return (
        <Button 
            text={`${user.isFollow ? 'Удалить из друзей' : 'Добавить в друзья'}`} 
            className="user-card__btn" 
            onClick={toggleFriend}
            disabled={disabled}
        />
    );
}