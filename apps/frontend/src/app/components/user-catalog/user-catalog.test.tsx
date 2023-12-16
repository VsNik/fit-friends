import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserCatalog } from './user-catalog';
import { makeFakeUserCollection } from '../../utils/mock-data';
import { CardsOnPage, SliceName } from '../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockOnShowMore = jest.fn();

const MockUserCatalog = ({ store, page }: { store: MockStore; page: number }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserCatalog page={page} onShowMore={mockOnShowMore} />
      </Provider>
    </Router>
  );
};

describe('Component: Users catalog', () => {
  it('Correct render', () => {
    const fakeUsers = makeFakeUserCollection(CardsOnPage.Users).data;
    const store = mockStore({
      [SliceName.Users]: { users: fakeUsers, package: 1, total: fakeUsers.length },
    });

    render(<MockUserCatalog store={store} page={1} />);

    const cards = screen.getAllByTestId('thumbnail-user');
    expect(cards.length).toEqual(fakeUsers.length);
    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });

    expect(screen.queryByTestId('show-more-button')).not.toBeInTheDocument();
  });

  it('Visible "Show More" button if users more 6', () => {
    const fakeUsers = makeFakeUserCollection(CardsOnPage.Users + 1).data;
    const store = mockStore({
      [SliceName.Users]: { users: fakeUsers, package: 1, total: fakeUsers.length },
    });

    render(<MockUserCatalog store={store} page={1} />);

    expect(screen.getByTestId('show-more-button')).toBeInTheDocument();
  });

  it('Click "Show More" button', () => {
    const fakeUsers = makeFakeUserCollection(CardsOnPage.Users + 1).data;
    const store = mockStore({
      [SliceName.Users]: { users: fakeUsers, package: 1, total: fakeUsers.length },
    });

    render(<MockUserCatalog store={store} page={1} />);

    fireEvent.click(screen.getByTestId('show-more-button'));
    expect(mockOnShowMore).toHaveBeenCalledTimes(1);
  });
});
