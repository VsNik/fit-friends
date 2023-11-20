import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { ForCompanySliderItem } from './for-company-slider-item';
import 'swiper/css';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { ButtonFloat } from '../ui/button-float/button-float';
import { useSliderControl } from '../../hooks/use-slider-control';

const SLIDERS = 4;

export const ForCompanySlider: React.FC = () => {
  const users = useAppSelector((state) => state.users.users);
  const sliderRef = useRef<SwiperRef | null>(null);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const {isDisablePrev, isDisableNext, handleChangeSlide} = useSliderControl(indexSlide, users, SLIDERS);

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
            <ButtonFloat text='Смотреть все' icon='arrow-right' light iconLeft/>
   
            <div className="look-for-company__controls">
              <ButtonIcon icon='arrow-left' onClick={handlePrev} className='look-for-company__control' outline disabled={isDisablePrev}/>
              <ButtonIcon icon='arrow-right' onClick={handleNext} className='look-for-company__control' outline disabled={isDisableNext}/>
            </div>
          </div>

          <Swiper 
            spaceBetween={20} 
            slidesPerView={SLIDERS} 
            className="look-for-company__list" 
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)} 
            ref={sliderRef}
          >
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
