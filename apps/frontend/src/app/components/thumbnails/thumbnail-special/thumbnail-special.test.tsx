import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ITraining } from '@fit-friends/shared';
import { ThumbnailSpecial } from './thumbnail-special';
import { makeFakeTraining } from '../../../utils/mock-data';

const history = createMemoryHistory();

const MockThumbnailSpecial = ({ training }: { training: ITraining }) => {
  return (
    <Router location={history.location} navigator={history}>
      <ThumbnailSpecial training={training} />
    </Router>
  );
};

describe('Component: Thumbnail total info', () => {
  it('Corect render component', () => {
    const fakeTraining = makeFakeTraining();

    render(<MockThumbnailSpecial training={fakeTraining} />);

    expect(screen.getByTestId('promo-image')).toHaveAttribute('src', fakeTraining.bgImage);
    expect(screen.getByTestId('promo-title').textContent).toBe(fakeTraining.title);
    expect(screen.getByTestId('promo-text').textContent).toBe(fakeTraining.description);
    expect(screen.getByTestId('promo-prica').textContent).toBe(`${fakeTraining.price} ₽`);
  });
});
