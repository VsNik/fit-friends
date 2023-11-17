import React from 'react';
import { Button } from '../../ui/button/button';

export const TrainingVideo: React.FC = () => {
  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          <picture>
            <source
              type="image/webp"
              srcSet="/assets/img/content/training-video/video-thumbnail.webp, /assets/img/content/training-video/video-thumbnail@2x.webp 2x"
            />
            <img
              src="/assets/img/content/training-video/video-thumbnail.png"
              srcSet="/assets/img/content/training-video/video-thumbnail@2x.png 2x"
              width="922"
              height="566"
              alt="Обложка видео"
            />
          </picture>
        </div>
        <button className="training-video__play-button btn-reset">
          <svg width="18" height="30" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="training-video__drop-files">
        <form action="#" method="post">
          <div className="training-video__form-wrapper">
            <div className="drag-and-drop">
              <label>
                <span className="drag-and-drop__label" tabIndex={0}>
                  Загрузите сюда файлы формата MOV, AVI или MP4
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="/assets/img/sprite.svg#icon-import-video" />
                  </svg>
                </span>
                <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="training-video__buttons-wrapper">
        <Button text='Сохранить' className='training-video__button training-video__button--start' disabled />
        {/* <button className="btn training-video__button training-video__button--start" type="button" disabled>
          Приступить
        </button> */}
        <div className="training-video__edit-buttons">
            <Button text='Сохранить' />
          <Button text='Удалить' outlined />
        </div>
      </div>
    </div>
  );
};
