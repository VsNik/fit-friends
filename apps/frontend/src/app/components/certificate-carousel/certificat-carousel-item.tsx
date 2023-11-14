import React, { useRef, useState } from 'react';

interface CertificatCarouselItemProps {
  userId: string;
  src: string;
  srcSet?: string;
  alt?: string;
  type?: string;
}

export const CertificatCarouselItem: React.FC<CertificatCarouselItemProps> = (props) => {
  const { userId, src, srcSet, alt, type } = props;
  const [isEdit, setIsEdit] = useState(false);
  const certificateRef = useRef<HTMLInputElement | null>(null);

  const onSave = () => {
    const certificate = certificateRef.current?.value;
    if (certificate) {
      console.log({userId, certificate});
    }    
    setIsEdit(false)
  }

  const onDelete = (certificate: string) => {
    console.log({userId, certificate});
  }

  return (
    <div className="personal-account-coach__item">
      <div className={`certificate-card ${isEdit ? 'certificate-card--edit' : ''}`}>
        <div className="certificate-card__image">
          <picture>
            <source type={type} srcSet={src} />
            <img src={src} srcSet={srcSet} width="294" height="360" alt={alt} />
          </picture>
        </div>

        <form className="certificate-card__buttons">
          <button
            onClick={() => setIsEdit(true)}
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
            type="button"
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-edit" />
            </svg>
            <span>Изменить</span>
          </button>
          <button
            onClick={() => onSave()}
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
            type="button"
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-edit" />
            </svg>
            <span>Сохранить</span>
          </button>
          <div className="certificate-card__controls">
            <label className="btn-icon certificate-card__control" aria-label="next">
              <input className="visually-hidden" type="file" name="certificate" accept=".pdf, .jpg, .png" ref={certificateRef} />
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-change" />
              </svg>
            </label>
            <button className="btn-icon certificate-card__control" type="button" aria-label="next" onClick={() => onDelete(src)}>
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-trash" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
