import React from 'react';
import { CoachType } from '@fit-friends/shared';
import { Avatar } from '../../ui/avatar/avatar';

interface TrainingUserInfoProps {
  coach: CoachType;
}

export const TrainingUserInfo: React.FC<TrainingUserInfoProps> = ({ coach }) => {

  return (
    <div className="training-info__coach" data-testid='training-user-info-component'>
      <Avatar src={coach?.avatar} className="training-info__photo" width={64} height={64} dataTestId='coach-avatar' />
      <div className="training-info__coach-info">
        <span className="training-info__label">Тренер</span>
        <span className="training-info__name">{coach?.name}</span>
      </div>
    </div>
  );
};
