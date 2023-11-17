import React, { useState } from 'react';
import clsx from 'clsx';
import { AppLayout } from '../../components/layouts/app-layout';
import { ReviewsBar } from '../../components/reviews-bar/reviews-bar';
import { TrainingInfo } from '../../components/training/training-info/training-info';
import { TrainingVideo } from '../../components/training/training-video/training-video';

export const TrainingCardPage: React.FC = () => {
  const [isEditable, setIsEditable] = useState(false);

  const onChangeMode = (value: boolean) => {
    setIsEditable(value);
  }

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>

            <ReviewsBar />

            <div className={clsx('training-card', {'training-card--edit': isEditable})}>
              <TrainingInfo onChangeMode={onChangeMode} />

              <TrainingVideo />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
