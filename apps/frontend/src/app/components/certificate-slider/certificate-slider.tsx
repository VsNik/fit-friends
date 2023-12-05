import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IUser } from '@fit-friends/shared';
import { ThumbnailCertificat } from '../thumbnails/thumbnail-certificat/thumbnail-certificat';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import { useAppSelector } from '../../store/hooks';
import { CountSlide, LoadStatus } from '../../constants/common';
import { AddCertificateForm } from '../forms/add-certificate-form/add-certificate-form';
import * as authSelector from '../../store/auth/auth-select';
import 'swiper/css';

interface CertificateSliderProps {
  user: IUser;
}

export const CertificateSlider: React.FC<CertificateSliderProps> = ({ user }) => {
  const loadStatus = useAppSelector(authSelector.loadStatus);
  const [certificates, setCertificates] = useState<string[]>([]);
  const sliderRef = useRef<SwiperRef | null>(null);

  const isLoading = loadStatus === LoadStatus.Loading;

  useEffect(() => {
    if (user.certificate) {
      const userCertificates = 
        Array.isArray(user.certificate) 
          ? user.certificate 
          : [user.certificate];
      setCertificates(userCertificates);
    }
  }, [user.certificate]);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(sliderRef, certificates, CountSlide.Certificate);

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>

        <AddCertificateForm userId={user.id} disabled={isLoading} />

        <div className="personal-account-coach__controls">
          <ButtonIcon icon="arrow-left" onClick={handlePrev} disabled={isFirstSlide} />
          <ButtonIcon icon="arrow-right" onClick={handleNext} disabled={isLastSlide} />
        </div>
      </div>

      <Swiper
        slidesPerView={CountSlide.Certificate}
        className="personal-account-coach__list"
        onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
        ref={sliderRef}
      >
        {certificates.map((certificate) => (
          <SwiperSlide key={certificate}>
            <ThumbnailCertificat src={certificate} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
