import React, { useRef, useState } from 'react';
import { Role } from '@fit-friends/shared';
import { Button } from '../../ui/button/button';
import { VideoPlayer } from '../video-payer/video-payer';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputFile } from '../../ui/form/input-file/input-file';
import { VideoType } from '../../../types/forms-type';
import { videoSchema } from '../../../utils/validate-schemas';
import { clsx } from 'clsx';

interface TrainingVideoProps {
  role: Role;
  video: string;
  isEditable: boolean;
}

export const TrainingVideo: React.FC<TrainingVideoProps> = ({ role, video, isEditable }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [playing, setPlaying] = useState(false);
  const [videoLoadMode, setVideoLoadMode] = useState<boolean>(false);

  const methods = useForm<VideoType>({
    resolver: yupResolver(videoSchema),
  });

  const { handleSubmit, reset, resetField } = methods;

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handleStopTraining = () => {
    videoRef.current?.load();
    setIsReady(false);
    setPlaying(false);
  };

  const handleStartTraining = () => {
    setIsReady(true);
  };

  const handleDeleteVideo = () => {
    setVideoLoadMode(true);
  };

  const handleSaveVideo = (data: VideoType) => {
    setVideoLoadMode(false);
    resetField('video');
    reset();
  };

  return (
    <div
      className={clsx('training-video', {
        'training-video--stop': isReady,
        'training-video--load': videoLoadMode,
      })}
    >
      <h2 className="training-video__title">Видео</h2>
      <VideoPlayer
        isReady={isReady}
        src="/assets/img/test.mp4"
        poster="/assets/img/content/training-video/video-thumbnail.png"
        onPlay={handlePlay}
        onEnded={handleStopTraining}
        videoRef={videoRef}
        setPlaying={setPlaying}
        isPlaying={playing}
      />

      <FormProvider {...methods}>
        <div className="training-video__drop-files">
          <div className="training-video__form-wrapper">
            <InputFile name="video" />
          </div>
        </div>

        <div className="training-video__buttons-wrapper">
          <Button text="Приступить" type="button" className="training-video__button training-video__button--start" onClick={handleStartTraining} />
          <Button text="Закончить" type="button" className="training-video__button training-video__button--stop" onClick={handleStopTraining} />
          <div className="training-video__edit-buttons">
            <Button text="Сохранить" onClick={handleSubmit(handleSaveVideo)} disabled={!videoLoadMode} />
            <Button text="Удалить" onClick={handleDeleteVideo} outlined disabled={videoLoadMode} />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
