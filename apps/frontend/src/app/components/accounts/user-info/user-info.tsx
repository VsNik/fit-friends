import React, { useRef, useState } from 'react';
import { IUser } from '@fit-friends/shared';
import { UserInfoForm } from '../../forms/user-info-form/user-info-form';
import { useImagePreview } from '../../../hooks/use-image-preview';
import { UserInfoAvatar } from '../user-info-avatar/user-info-avatar';
import clsx from 'clsx';

interface UserInfoProps {
  user: IUser;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const [avatarError, setAvatarError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { previewImage, resetImage } = useImagePreview(avatar as FileList);

  const handleClickUpdate = () => {
    inputRef.current?.click();
  };

  const handleClickDelete = () => {
    resetImage();
    setAvatar(null);
    inputRef.current!.value = '';  
  };

  return (
    <section className={clsx(isEditable ? 'user-info-edit' : 'user-info')}>
      <div className="user-info-edit__header">
        <UserInfoAvatar user={user} setAvatar={setAvatar} preview={previewImage} inputRef={inputRef} disabled={!isEditable} />
        {avatarError && <i className='custom-textarea__error'>{avatarError}</i>}

        {isEditable && (
          <div className="user-info-edit__controls">
            <button className="user-info-edit__control-btn" aria-label="обновить" onClick={handleClickUpdate}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-change" />
              </svg>
            </button>
            <button className="user-info-edit__control-btn" aria-label="удалить" onClick={handleClickDelete}>
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-trash" />
              </svg>
            </button>
          </div>
        )}
      </div>      

      <UserInfoForm user={user} isEditable={isEditable} setEditable={setIsEditable} avatar={avatar} setAvatarError={setAvatarError} />
    </section>
  );
};
