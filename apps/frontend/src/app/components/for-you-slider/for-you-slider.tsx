import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ForYouSliderItem } from './for-you-slider-item';
import { useAppSelector } from '../../store/hooks';

export const ForYouSlider: React.FC = () => {
  const trainings = useAppSelector(state => state.forYouTrainings.trainings);

  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous" onClick={handlePrev}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
                </svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next" onClick={handleNext}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-right" />
                </svg>
              </button>
            </div>
          </div>

          <Swiper spaceBetween={20} slidesPerView={3} className="special-for-you__list" ref={sliderRef}>
            {trainings?.map((training) => (
              <SwiperSlide key={training.id}>
                <ForYouSliderItem src={training.bgImage} type="image/jpg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
