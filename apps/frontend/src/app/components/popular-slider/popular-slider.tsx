import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { PopularSliderItem } from './popular-slider-item';
import 'swiper/css';

export const PopularSlider: React.FC = () => {
  const trainings = useAppSelector((state) => state.popularTrainings.trainings);
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#arrow-right" />
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous" onClick={handlePrev}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next" onClick={handleNext}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-right" />
                </svg>
              </button>
            </div>
          </div>

          <Swiper spaceBetween={20} slidesPerView={4} className="popular-trainings__list" ref={sliderRef}>
            {trainings?.map((training) => (
              <SwiperSlide key={training.id}>
                <PopularSliderItem training={training} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
