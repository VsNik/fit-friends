import React from 'react';

interface UserCardGallaryProps {
  images?: string[] | [];
  className?: string;
}

export const UserCardGallary: React.FC<UserCardGallaryProps> = ({ images, className }) => {
  return (
    <div className={className}>
      {images?.length && (
        <ul className={`${className}-list`}>
          <li className={`${className}-item`}>
            <img src={images[0]} srcSet={images[0]} width="334" height="573" alt="photo1" />
          </li>
          <li className="user-card__gallary-item">
            <img src="/assets/img/content/user-card-photo2.jpg" srcSet="/assets/img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
          </li>
        </ul>
      )}
    </div>
  );
};
