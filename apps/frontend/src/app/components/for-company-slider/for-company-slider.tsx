import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { ButtonFloat } from '../ui/button-float/button-float';
import { useSliderControl } from '../../hooks/use-slider-control';
import { RouteName } from '../../constants/route';
import { ThumbnailUserCard } from '../thumbnails/thumbnail-user-card/thumbnail-user-card';
import { ThumbnailBanner } from '../thumbnails/thumbnail-banner/thumbnail-banner';
import { CountSlide } from '../../constants/common';
import * as usersSelector from '../../store/users/users-select';
import 'swiper/css';

export const ForCompanySlider: React.FC = () => {
  const navigate = useNavigate();
  const users = useAppSelector(usersSelector.users);
  const sliderRef = useRef<SwiperRef | null>(null);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(sliderRef, users, CountSlide.Company);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <ButtonFloat text="Смотреть все" icon="arrow-right" onClick={() => navigate(RouteName.Users)} light iconLeft dataTestId='to-home-buttom' />

            <div className="look-for-company__controls">
              <ButtonIcon icon="arrow-left" onClick={handlePrev} className="look-for-company__control" outline disabled={isFirstSlide} dataTestId='prev-slide' />
              <ButtonIcon icon="arrow-right" onClick={handleNext} className="look-for-company__control" outline disabled={isLastSlide} dataTestId='next-slide' />
            </div>
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView={CountSlide.Company}
            className="look-for-company__list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
            ref={sliderRef}
          >
            {users.length ? (
              users?.map((user) => (
                <SwiperSlide key={user.id}>
                  <ThumbnailUserCard user={user} dark />
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
