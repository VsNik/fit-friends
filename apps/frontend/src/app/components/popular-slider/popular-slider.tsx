import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { ButtonFloat } from '../ui/button-float/button-float';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { RouteName } from '../../constants/route';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import 'swiper/css';

const SLIDERS = 4;

export const PopularSlider: React.FC = () => {
  const navigation = useNavigate();
  const trainings = useAppSelector(trainingsSelector.trainingsPopular);
  const sliderRef = useRef<SwiperRef | null>(null);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(sliderRef, trainings, SLIDERS);

  const onGoTrainingList = () => {
    navigation(RouteName.Trainings);
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <ButtonFloat text="Смотреть все" icon="arrow-right" className="popular-trainings__button" iconLeft onClick={onGoTrainingList} />

            <div className="popular-trainings__controls">
              <ButtonIcon icon="arrow-left" className="popular-trainings__control" onClick={handlePrev} disabled={isFirstSlide} />
              <ButtonIcon icon="arrow-right" className="popular-trainings__control" onClick={handleNext} disabled={isLastSlide} />
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
                <ThumbnailTraining training={training} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
