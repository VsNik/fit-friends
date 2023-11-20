import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { PopularSliderItem } from './popular-slider-item';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../app';
import { ButtonFloat } from '../ui/button-float/button-float';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import 'swiper/css';
import { useSliderControl } from '../../hooks/use-slider-control';

const SLIDERS = 4;

export const PopularSlider: React.FC = () => {
  const navigation = useNavigate();
  const trainings = useAppSelector((state) => state.popularTrainings.trainings);
  const sliderRef = useRef<SwiperRef | null>(null);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const {isDisablePrev, isDisableNext, handleChangeSlide} = useSliderControl(indexSlide, trainings, SLIDERS);

  const onGoTrainingList = () => {
    navigation(RouteName.Trainings)
  }

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
            <ButtonFloat text='Смотреть все' icon='arrow-right' className='popular-trainings__button' iconLeft onClick={onGoTrainingList} />

            <div className="popular-trainings__controls">
              <ButtonIcon icon='arrow-left' className='popular-trainings__control' onClick={handlePrev} disabled={isDisablePrev} />
              <ButtonIcon icon='arrow-right' className='popular-trainings__control' onClick={handleNext} disabled={isDisableNext} />
            </div>
          </div>

          <Swiper 
            spaceBetween={20} 
            slidesPerView={SLIDERS} 
            className="popular-trainings__list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}   
            ref={sliderRef}
          >
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
