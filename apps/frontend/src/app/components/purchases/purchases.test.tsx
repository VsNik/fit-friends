import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Purchases } from './purchases';
import { makeFakeBalanceCollection } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';
import userEvent from '@testing-library/user-event';
import { BalanceFiter } from '@fit-friends/shared';

const COUNT_ORDERS = 4;

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockSetFilter = jest.fn();
const mockShowMore = jest.fn();

const MockPurchases = ({ store, filter, showButton = false }: { store: MockStore; filter: BalanceFiter; showButton?: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <Purchases filter={filter} onShowMore={mockShowMore} onSetFilter={mockSetFilter} showButton={showButton} />
      </Provider>
    </Router>
  );
};

describe('Component: Purchases', () => {
  it('Render Purchases component', () => {
    const fakeBalances = makeFakeBalanceCollection(COUNT_ORDERS).data;

    const store = mockStore({
      [SliceName.Balances]: { balances: fakeBalances },
    });

    render(<MockPurchases store={store} filter={BalanceFiter.All} />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Мои покупки')).toBeInTheDocument();
    expect(screen.getByText('Только активные')).toBeInTheDocument();
    expect(screen.getByTestId('swich-active')).toBeInTheDocument();

    expect(screen.queryByTestId('show-more-button')).toBeNull();

    const thumbnails = screen.getAllByTestId('thumbnail-training');
    expect(thumbnails.length).toEqual(COUNT_ORDERS);
  });

  it('Visible button "Show More", if passed "showButton" parametr', () => {
    const fakeBalances = makeFakeBalanceCollection(COUNT_ORDERS).data;

    const store = mockStore({
      [SliceName.Balances]: { balances: fakeBalances },
    });

    render(<MockPurchases store={store} filter={BalanceFiter.All} showButton />);

    expect(screen.getByTestId('show-more-button')).toBeInTheDocument();
  });

  it('Click "Active Only", and click "Show More"', async () => {
    const fakeBalances = makeFakeBalanceCollection(COUNT_ORDERS).data;

    const store = mockStore({
      [SliceName.Balances]: { balances: fakeBalances },
    });

    render(<MockPurchases store={store} filter={BalanceFiter.All} showButton />);

    const toggler = screen.getByTestId('swich-active');
    await userEvent.click(toggler);
    expect(mockSetFilter).toHaveBeenCalledTimes(1);

    const showMoreButton = screen.getByTestId('show-more-button');
    await userEvent.click(showMoreButton);
    expect(mockShowMore).toHaveBeenCalledTimes(1);
  });
});
