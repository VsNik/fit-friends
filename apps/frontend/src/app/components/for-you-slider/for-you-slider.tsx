import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { ThumbnailTrainingAnons } from '../thumbnails/thumbnails-training-anons/thumbnails-training-anons';
import { useAppSelector } from '../../store/hooks';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import { ThumbnailBanner } from '../thumbnails/thumbnail-banner/thumbnail-banner';
import { CountSlide } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import 'swiper/css';

export const ForYouSlider: React.FC = () => {
  const trainings = useAppSelector(trainingsSelector.trainingsForYou);
  const sliderRef = useRef<SwiperRef | null>(null);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(sliderRef, trainings, CountSlide.ForYou);

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <ButtonIcon icon="arrow-left" className="special-for-you__control" onClick={handlePrev} disabled={isFirstSlide} dataTestId='prev-slide' />
              <ButtonIcon icon="arrow-right" className="special-for-you__control" onClick={handleNext} disabled={isLastSlide} dataTestId='next-slide' />
            </div>
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView={CountSlide.ForYou}
            className="special-for-you__list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
            ref={sliderRef}
          >
            {trainings.length ? (
              trainings.map((training) => (
                <SwiperSlide key={training.id}>
                  <ThumbnailTrainingAnons training={training} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <ThumbnailBanner 
                  image="/assets/img/content/nearest-gym-01.jpg" 
                  text="Скоро здесь появится что - то полезное" 
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
