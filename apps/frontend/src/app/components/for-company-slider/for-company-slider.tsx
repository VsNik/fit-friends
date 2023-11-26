import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { ButtonFloat } from '../ui/button-float/button-float';
import { useSliderControl } from '../../hooks/use-slider-control';
import { RouteName } from '../../constants/route';
import { ThumbnailUserCard } from '../thumbnails/thumbnail-user-card/thumbnail-user-card';
import * as usersSelector from '../../store/users/users-select';
import 'swiper/css';

const SLIDERS = 4;

export const ForCompanySlider: React.FC = () => {
  const navigate = useNavigate();
  const users = useAppSelector(usersSelector.users);
  const sliderRef = useRef<SwiperRef | null>(null);

  const {handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide} = useSliderControl(sliderRef, users, SLIDERS);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <ButtonFloat text='Смотреть все' icon='arrow-right' onClick={() => navigate(RouteName.Users)} light iconLeft/>
   
            <div className="look-for-company__controls">
              <ButtonIcon icon='arrow-left' onClick={handlePrev} className='look-for-company__control' outline disabled={isFirstSlide}/>
              <ButtonIcon icon='arrow-right' onClick={handleNext} className='look-for-company__control' outline disabled={isLastSlide}/>
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
                <ThumbnailUserCard user={user} dark />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
