import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import './styles.css';
import { useAppSelector } from '../../store/hooks';
import { SpecialSliderItem } from './special-slider-item';

export const SpecialSlider: React.FC = () => {
  const trainings = useAppSelector((state) => state.specialTrainings.trainings);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>

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
                <SpecialSliderItem title={training.title} src={training.bgImage} price={training.price} />
              </SwiperSlide>
            ))}

            <div className="promo-slider__dots" />
          </Swiper>

          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/assets/img/content/thumbnails/nearest-gym-01.webp, /assets/img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                />
                <img
                  src="/assets/img/content/thumbnails/nearest-gym-01.jpg"
                  srcSet="/assets/img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                  width="330"
                  height="190"
                  alt=""
                />
              </picture>
            </div>

            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
