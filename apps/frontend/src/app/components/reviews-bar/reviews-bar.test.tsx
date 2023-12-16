import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ReviewsBar } from './reviews-bar';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { IReview, Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';
import { makeFakeReviewCollection } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockOpenPopup = jest.fn();

const MockReviewsBar = ({ store, role, reviews }: { store: MockStore; role: Role; reviews: IReview[] }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ReviewsBar role={role} reviews={reviews} onOpenPopup={mockOpenPopup} />
      </Provider>
    </Router>
  );
};

describe('Component: Reviews bar', () => {
  it('', () => {
    const fakeReviews = makeFakeReviewCollection().data;
    const store = mockStore({
      [SliceName.Reviews]: { reviews: fakeReviews },
    });

    render(<MockReviewsBar store={store} role={Role.User} reviews={fakeReviews} />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();

    const reviewCards = screen.getAllByTestId('review-author-avatar');
    expect(reviewCards.length).toEqual(fakeReviews.length);

    for (const card of reviewCards) {
      expect(card).toBeInTheDocument();
    }

    expect(screen.queryByText('Отзывов пока нет')).toBeNull();

    expect(screen.getByTestId('open-popup-button')).toBeInTheDocument();
    expect(screen.getByTestId('open-popup-button')).not.toBeDisabled();
  });

  it('Show text stub, if empty reviews list', () => {
    const store = mockStore({
      [SliceName.Reviews]: { reviews: [] },
    });

    render(<MockReviewsBar store={store} role={Role.User} reviews={[]} />);

    expect(screen.getByText('Отзывов пока нет')).toBeInTheDocument();
  });

  it('Disabled create review button if role coach', () => {
    const store = mockStore({
      [SliceName.Reviews]: { reviews: [] },
    });

    render(<MockReviewsBar store={store} role={Role.Coach} reviews={[]} />);

    expect(screen.getByTestId('open-popup-button')).toBeDisabled();
  });

  it('Click to open topup', async () => {
    const store = mockStore({
      [SliceName.Reviews]: { reviews: [] },
    });

    render(<MockReviewsBar store={store} role={Role.User} reviews={[]} />);

    await userEvent.click(screen.getByTestId('open-popup-button'));
    expect(mockOpenPopup).toHaveBeenCalledTimes(1);
  });
});
