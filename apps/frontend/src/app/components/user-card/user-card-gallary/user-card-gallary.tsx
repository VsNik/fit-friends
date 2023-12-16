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
            <img src={images[0]} srcSet={images[0]} width="334" height="573" alt="photo1"  data-testid='user-galery-bg'/>
          </li>
          <li className="user-card__gallary-item">
            <img src={images[1]} srcSet={images[1]} width="334" height="573" alt="photo2" data-testid='user-galery-bg' />
          </li>
        </ul>
      )}
    </div>
  );
};
