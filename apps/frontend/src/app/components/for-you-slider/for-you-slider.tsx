import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { ForYouSliderItem } from './for-you-slider-item';
import { useAppSelector } from '../../store/hooks';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import 'swiper/css';

const SLIDERS = 3;

export const ForYouSlider: React.FC = () => {
  const trainings = useAppSelector(trainingsSelector.trainingsForYou);
  const sliderRef = useRef<SwiperRef | null>(null);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const {isDisablePrev, isDisableNext, handleChangeSlide} = useSliderControl(indexSlide, trainings, SLIDERS);

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
              <ButtonIcon icon='arrow-left' className='special-for-you__control' onClick={handlePrev} disabled={isDisablePrev} />
              <ButtonIcon icon='arrow-right' className='special-for-you__control' onClick={handleNext} disabled={isDisableNext} />
            </div>
          </div>

          <Swiper 
            spaceBetween={20} 
            slidesPerView={3} 
            className="special-for-you__list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}  
            ref={sliderRef}
          >
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
