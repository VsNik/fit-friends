import React, { useCallback, useRef, Fragment } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { ITraining } from '@fit-friends/shared';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { ThumbnailTraining } from '../../thumbnails/thumbnail-training/thumbnail-training';
import { useSliderControl } from '../../../hooks/use-slider-control';

const SLIDERS = 4;

interface UserCardCertificateSliderProps {
  trainings: ITraining[];
}

export const UserCardCertificateSlider: React.FC<UserCardCertificateSliderProps> = (props) => {
  const { trainings } = props;
  const sliderRef = useRef<SwiperRef | null>(null);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const { isDisablePrev, isDisableNext, handleChangeSlide } = useSliderControl(indexSlide, trainings, SLIDERS);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <Fragment>
      <div className="user-card-coach__training-head">
        <h2 className="user-card-coach__training-title">Тренировки</h2>
        <div className="user-card-coach__training-bts">
          <ButtonIcon icon="arrow-left" className="user-card-coach__training-btn" onClick={handlePrev} disabled={isDisablePrev} />
          <ButtonIcon icon="arrow-right" className="user-card-coach__training-btn" onClick={handleNext} disabled={isDisableNext} />
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={SLIDERS}
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
