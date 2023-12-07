import React, { useRef, Fragment } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { ITraining } from '@fit-friends/shared';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { ThumbnailTraining } from '../../thumbnails/thumbnail-training/thumbnail-training';
import { useSliderControl } from '../../../hooks/use-slider-control';
import { CountSlide } from '../../../constants/common';

interface UserCardCertificateSliderProps {
  trainings: ITraining[];
}

export const UserCardTrainingSlider: React.FC<UserCardCertificateSliderProps> = (props) => {
  const { trainings } = props;
  const sliderRef = useRef<SwiperRef | null>(null);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(sliderRef, trainings, CountSlide.CoachCard);

  return (
    <Fragment>
      <div className="user-card-coach__training-head">
        <h2 className="user-card-coach__training-title">
          {trainings.length > 0 ? 'Тренировки' : 'Тренировок пока нет'}
        </h2>
        <div className="user-card-coach__training-bts">
          <ButtonIcon icon="arrow-left" className="user-card-coach__training-btn" onClick={handlePrev} disabled={isFirstSlide} />
          <ButtonIcon icon="arrow-right" className="user-card-coach__training-btn" onClick={handleNext} disabled={isLastSlide} />
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={CountSlide.CoachCard}
        className="user-card-coach__training-list"
        onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
        ref={sliderRef}
      >
        {trainings?.map((training) => (
          <SwiperSlide key={training.id}>
            <ThumbnailTraining training={training} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};
