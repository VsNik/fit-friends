import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { useAppSelector } from '../../store/hooks';
import { ThumbnailSpecial } from '../thumbnails/thumbnail-special/thumbnail-special';
import { ThumbnailBanner } from '../thumbnails/thumbnail-banner/thumbnail-banner';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import 'swiper/css';
import './styles.css';

export const SpecialSlider: React.FC = () => {
  const trainings = useAppSelector(trainingsSelector.trainingsSpecial);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>

          {trainings.length && (
            <Swiper
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: '.promo-slider__dots',
                type: 'bullets',
                bulletClass: 'promo-slider__dot',
                bulletActiveClass: 'promo-slider__dot-active',
              }}
              modules={[Autoplay, Pagination]}
              className="special-offers__list"
            >
              {trainings.map((training) => (
                <SwiperSlide key={training.id}>
                  <ThumbnailSpecial training={training} />
                </SwiperSlide>
              ))}

              <div className="promo-slider__dots" />
            </Swiper>
          )}

          <ThumbnailBanner 
            image="/assets/img/content/thumbnails/nearest-gym-01.jpg" 
            text="Скоро здесь появится что - то полезное" 
          />
        </div>
      </div>
    </section>
  );
};
