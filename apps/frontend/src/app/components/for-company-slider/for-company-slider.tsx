import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { ForCompanySliderItem } from './for-company-slider-item';
import 'swiper/css';

export const ForCompanySlider: React.FC = () => {
  const users = useAppSelector((state) => state.users.users);
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#arrow-right" />
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous" onClick={handlePrev}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
                </svg>
              </button>
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next" onClick={handleNext}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-right" />
                </svg>
              </button>
            </div>
          </div>

          <Swiper spaceBetween={20} slidesPerView={4} className="look-for-company__list" ref={sliderRef}>
            {users?.map((user) => (
              <SwiperSlide key={user.id}>
                <ForCompanySliderItem user={user} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
