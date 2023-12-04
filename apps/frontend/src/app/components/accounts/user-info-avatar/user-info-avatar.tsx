import React, { Ref } from 'react';
import { IUser } from '@fit-friends/shared';

interface UserInfoAvatarProps {
  user: IUser;
  setAvatar: (value: FileList | null) => void;
  preview: string;
  disabled?: boolean;
  inputRef: Ref<HTMLInputElement> | null;
}

export const UserInfoAvatar: React.FC<UserInfoAvatarProps> = ({ user, setAvatar, preview, disabled, inputRef }) => {
  return (
    <div className="input-load-avatar">
      <label>
        <input
          className="visually-hidden"
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          disabled={disabled}
          ref={inputRef}
          onChange={(evt) => setAvatar(evt.target.files)}
        />
        <span className="input-load-avatar__avatar">
          <img src={preview || user.avatar || '/assets/img/default_avatar.png'} width="98" height="98" alt="user avatar" />
        </span>
      </label>
    </div>
  );
};
