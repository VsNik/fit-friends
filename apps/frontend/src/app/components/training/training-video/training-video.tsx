import React, { useRef, useState } from 'react';
import { IBalance, Role } from '@fit-friends/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../ui/button/button';
import { VideoPlayer } from '../video-payer/video-payer';
import { InputFile } from '../../ui/form/input-file/input-file';
import { VideoType } from '../../../types/forms-type';
import { videoSchema } from '../../../utils/validate-schemas';
import { VIDEO_POSTER } from '../../../constants/common';
import { useAppDispatch } from '../../../store/hooks';
import { removeVideoAction, saveVideoAction } from '../../../store/training/async-actions';
import { dismissionAction, setNoActiveAction } from '../../../store/balance/async-action';
import { clsx } from 'clsx';

interface TrainingVideoProps {
  trainingId: string;
  role: Role;
  video: string;
  isAuthor: boolean;
  isEditable: boolean;
  setIsEditable: (value: boolean) => void;
  isPositiveBalance: boolean;
  balance?: IBalance | null;
}

export const TrainingVideo: React.FC<TrainingVideoProps> = (props) => {
  const { trainingId, role, video, isAuthor, isEditable, setIsEditable, isPositiveBalance, balance } = props;

  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoLoadMode, setVideoLoadMode] = useState(false);

  const methods = useForm<VideoType>({
    resolver: yupResolver(videoSchema),
  });

  const { handleSubmit, reset, resetField } = methods;

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handleStopTraining = () => {
    if (role === Role.User) {
      dispatch(setNoActiveAction(trainingId));
    }
    videoRef.current?.load();
    setIsReady(false);
    setPlaying(false);
  };

  const handleStartTraining = () => {
    if (role === Role.User && !balance?.isActive) {
      dispatch(dismissionAction(trainingId));
    }
    setIsReady(true);
  };

  const handleDeleteVideo = () => {
    dispatch(removeVideoAction({ id: trainingId, src: video }));
    setVideoLoadMode(true);
  };

  const handleSaveVideo = (data: VideoType) => {
    const video = data.video as FileList;
    const formData = new FormData();
    formData.append('video', video[0]);

    dispatch(saveVideoAction({ id: trainingId, formData }))
      .unwrap()
      .then(() => {
        setVideoLoadMode(false);
        setIsEditable(false);
        resetField('video');
        reset();
      });
  };

  return (
    <div
      className={clsx('training-video', {
        'training-video--stop': isReady,
        'training-video--load': videoLoadMode || !video,
      })}
      data-testid="training-video-component"
    >
      <h2 className="training-video__title">{video ? 'Видео' : 'Видео не загружено'}</h2>

      {video && (
        <VideoPlayer
          isReady={isReady}
          src={video}
          poster={VIDEO_POSTER}
          onPlay={handlePlay}
          onEnded={handleStopTraining}
          videoRef={videoRef}
          setPlaying={setPlaying}
          isPlaying={playing}
        />
      )}

      <FormProvider {...methods}>
        <div className="training-video__drop-files">
          <div className="training-video__form-wrapper" data-testid='input-video-file-block'>
              {isEditable && <InputFile name="video" dataTestId="input-video-file" />}
          </div>
        </div>

        <div className="training-video__buttons-wrapper">
          {!!video && (
            <Button
              text="Приступить"
              type="button"
              className="training-video__button training-video__button--start"
              onClick={handleStartTraining}
              disabled={(role === Role.User && !isPositiveBalance) || (role === Role.Coach && !isAuthor)}
              dataTestId="start-training-button"
            />
          )}
          <Button
            text="Закончить"
            type="button"
            className="training-video__button training-video__button--stop"
            onClick={handleStopTraining}
            dataTestId="end-training-button"
          />
          {role === Role.Coach && (
            <div className="training-video__edit-buttons" data-testid="video-edit-buttons">
              <Button text="Сохранить" onClick={handleSubmit(handleSaveVideo)} disabled={!videoLoadMode && !!video} dataTestId="save-video-button" />
              <Button text="Удалить" onClick={handleDeleteVideo} outlined disabled={videoLoadMode || !video} dataTestId="remove-video-button" />
            </div>
          )}
        </div>
      </FormProvider>
    </div>
  );
};
