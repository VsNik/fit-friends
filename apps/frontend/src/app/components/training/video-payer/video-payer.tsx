import React, { Ref } from 'react';
import { clsx } from 'clsx';

interface VideoPlayerProps {
  src: string;
  poster: string;
  onPlay: () => void;
  onEnded: () => void;
  isReady: boolean;
  isPlaying: boolean;
  videoRef: Ref<HTMLVideoElement> | null;
  setPlaying: (value: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const { src, poster, onPlay, onEnded, setPlaying, isReady, isPlaying, videoRef } = props;

  return (
    <div className="training-video__video">
      <video
        controls={isReady}
        src={src}
        poster={poster}
        width={922}
        height={560}
        onEnded={onEnded}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        ref={videoRef}
      />
      {!isPlaying && (
        <button
          className={clsx('training-video__play-button btn-reset', {
            'is-disabled': !isReady,
          })}
          onClick={onPlay}
        >
          <svg width="18" height="30" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-arrow" />
          </svg>
        </button>
      )}
    </div>
  );
};
