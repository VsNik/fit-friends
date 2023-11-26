import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import { useAppSelector } from '../../store/hooks';
import { ThumbnailSpecial } from '../thumbnails/thumbnail-special/thumbnail-special';
import { Image } from '../ui/image/image';
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
                <ThumbnailSpecial title={training.title} src={training.bgImage} price={training.price} />
              </SwiperSlide>
            ))}

            <div className="promo-slider__dots" />
          </Swiper>

          <div className="thumbnail-spec-gym">
            <Image src="/assets/img/content/thumbnails/nearest-gym-01.jpg" className="thumbnail-spec-gym__image" />
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
