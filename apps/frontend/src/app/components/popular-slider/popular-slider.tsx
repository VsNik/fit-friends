import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { ButtonFloat } from '../ui/button-float/button-float';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { RouteName } from '../../constants/route';
import { ThumbnailBanner } from '../thumbnails/thumbnail-banner/thumbnail-banner';
import { CountSlide } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import 'swiper/css';

export const PopularSlider: React.FC = () => {
  const navigation = useNavigate();
  const trainings = useAppSelector(trainingsSelector.trainingsPopular);
  const sliderRef = useRef<SwiperRef | null>(null);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(sliderRef, trainings, CountSlide.Popular);

  const onGoTrainingList = () => {
    navigation(RouteName.Trainings);
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <ButtonFloat text="Смотреть все" icon="arrow-right" className="popular-trainings__button" iconLeft onClick={onGoTrainingList} dataTestId='to-home-button' />

            <div className="popular-trainings__controls">
              <ButtonIcon icon="arrow-left" className="popular-trainings__control" onClick={handlePrev} disabled={isFirstSlide} dataTestId='prev-slide' />
              <ButtonIcon icon="arrow-right" className="popular-trainings__control" onClick={handleNext} disabled={isLastSlide} dataTestId='next-slide' />
            </div>
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView={CountSlide.Popular}
            className="popular-trainings__list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
            ref={sliderRef}
          >
            {trainings.length ? (
              trainings?.map((training) => (
                <SwiperSlide key={training.id}>
                  <ThumbnailTraining training={training} />
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
