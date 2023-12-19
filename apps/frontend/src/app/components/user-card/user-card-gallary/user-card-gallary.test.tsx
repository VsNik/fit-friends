import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserCardGallary } from './user-card-gallary';
import { galeryImages } from '../../../utils/mock-data';

const history = createMemoryHistory();

const MockUserCardGallary = ({ images }: { images: string[] }) => {
  return (
    <Router location={history.location} navigator={history}>
      <UserCardGallary images={images} />
    </Router>
  );
};

describe('Component: User card gallery', () => {
  it('Correct render', () => {
    render(<MockUserCardGallary images={galeryImages} />);

    const bgImages = screen.getAllByTestId('user-galery-bg');
    expect(bgImages.length).toEqual(galeryImages.length);

    for (const image of bgImages) {
      expect(image).toBeInTheDocument();
    }
  });
});
