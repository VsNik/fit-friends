import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { IReview } from '@fit-friends/shared';
import { ThumbnailReview } from './thumbnail-review';
import { makeFakeReview } from '../../../utils/mock-data';

const history = createMemoryHistory();

const MockThumbnailReview = ({ review }: { review: IReview }) => {
  return (
    <Router location={history.location} navigator={history}>
      <ThumbnailReview review={review} />
    </Router>
  );
};

describe('Component: Thumbnail total info', () => {
  it('Corect render component', () => {
    const fakeReview = makeFakeReview();

    render(<MockThumbnailReview review={fakeReview} />);

    expect(screen.getByTestId('review-author-avatar')).toHaveAttribute('src', fakeReview.user.avatar);
    expect(screen.getByTestId('review-author-name').textContent).toBe(fakeReview.user.name);
    expect(screen.getByTestId('review-rating').textContent).toBe(`${fakeReview.rating}`);
    expect(screen.getByTestId('review-text').textContent).toBe(fakeReview.text);
  });
});
