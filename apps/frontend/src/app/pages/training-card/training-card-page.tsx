import React, { useState } from 'react';
import clsx from 'clsx';
import { AppLayout } from '../../components/layouts/app-layout';
import { ReviewsBar } from '../../components/reviews-bar/reviews-bar';
import { TrainingInfo } from '../../components/training/training-info/training-info';
import { TrainingVideo } from '../../components/training/training-video/training-video';
import { useAppSelector } from '../../store/hooks';
import { getFakeTrainings } from '../../fake-data/fake-training';
import * as authSelectors from '../../store/auth/auth-select';
// import * as trainingSelectors from '../../store/training/training-select';

export const TrainingCardPage: React.FC = () => {
  const training = getFakeTrainings(1).data[0];
  // const training = useAppSelector(trainingSelectors.training)
  const { role } = useAppSelector(authSelectors.authUser);
  const [isEditable, setIsEditable] = useState(false);

  const onChangeMode = (value: boolean) => {
    setIsEditable(value);
  };

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <ReviewsBar trainingId={training.id} />

            <div className={clsx('training-card', { 'training-card--edit': isEditable })}>
              <TrainingInfo training={training} role={role} isEditable={isEditable} onChangeMode={onChangeMode} />
              <TrainingVideo role={role} video={training.video} isEditable={isEditable} />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
