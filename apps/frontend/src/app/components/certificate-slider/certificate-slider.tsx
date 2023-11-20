import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IUser } from '@fit-friends/shared';
import { CertificatCarouselItem } from './certificat-carousel-item';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import { ButtonFloat } from '../ui/button-float/button-float';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCertificateAction } from '../../store/auth/async-actions';
import 'swiper/css';

const SLIDERS = 3;

interface CertificateSliderProps {
  user: IUser;
}

export const CertificateSlider: React.FC<CertificateSliderProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const [certificates, setCertificates] = useState<string[]>([]);
  const sliderRef = useRef<SwiperRef | null>(null);
  const certificateRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user.certificate) {
      const userCertificates = Array.isArray(user.certificate) ? user.certificate : [user.certificate];
      setCertificates(userCertificates);
    }
  }, [user.certificate]);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const { isDisablePrev, isDisableNext, handleChangeSlide } = useSliderControl(indexSlide, certificates, SLIDERS);

  const handleClicAddCertificate = () => {
    certificateRef.current?.click();
  };

  const handleUpload = (fileList: FileList | null) => {
    if (fileList && fileList[0]) {
      dispatch(addCertificateAction({ id: user.id, certificate: fileList[0] }));
    }
  };

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>

        <input
          className="visually-hidden"
          type="file"
          name="certificate"
          accept=".pdf, .jpg, .png"          
          onChange={(evt) => handleUpload(evt.target.files)}
          ref={certificateRef}
        />

        <ButtonFloat
          text="Загрузить"
          icon="icon-import"
          className="personal-account-coach__button"
          underline
          onClick={handleClicAddCertificate}
          disabled={isLoading}
        />

        <div className="personal-account-coach__controls">
          <ButtonIcon icon="arrow-left" onClick={handlePrev} disabled={isDisablePrev} />
          <ButtonIcon icon="arrow-right" onClick={handleNext} disabled={isDisableNext} />
        </div>
      </div>

      <Swiper
        slidesPerView={SLIDERS}
        className="personal-account-coach__list"
        onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
        ref={sliderRef}
      >
        {certificates.map((certificate) => (
          <SwiperSlide key={certificate}>
            <CertificatCarouselItem userId={user.id} src={certificate} alt={`${user.name} - Сертификат`} type="image/jpg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
