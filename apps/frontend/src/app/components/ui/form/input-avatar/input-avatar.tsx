import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputAvatarProps {
  name: string;
  accept: string;
  previewImage?: string;
  dataTestId?: string;
}

export const InputAvatar: React.FC<InputAvatarProps> = ({name, accept, previewImage, dataTestId}) => {
  const {register, formState: {errors}} = useFormContext();  

  return (
    <div className="input-load-avatar">
      <label>
        <input
          {...register(name)}
          name={name}
          className="visually-hidden"
          type="file"
          accept={accept}
          data-testid={dataTestId}
        />
        <span className="input-load-avatar__btn">
          {previewImage ? (
            <span className="input-load-avatar__avatar">
              <img src={String(previewImage)} width={98} height={98} alt="user-avatar"/>
            </span>
          ) : (
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-import"/>
            </svg>
          )}
        </span>
        {errors[name] && <i className='custom-input__error'>{errors?.[name]?.message as string}</i>}
      </label>
    </div>
  );
};
