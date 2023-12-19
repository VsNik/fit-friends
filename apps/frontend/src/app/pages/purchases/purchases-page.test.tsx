import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PurchasesPage } from './purchases-page';
import { makeFakeBalanceCollection } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockPurchasesPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <PurchasesPage />
      </Provider>
    </Router>
  );
};

describe('Component: Purchases Page', () => {
  it('Render Purchases component', () => {
    const fakeBalances = makeFakeBalanceCollection().data;
    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Balances]: { balances: fakeBalances },
    });

    render(<MockPurchasesPage store={store} />);
    expect(screen.getByTestId('purchases-component')).toBeInTheDocument();
    mockDispatch.mockClear();
  });

  it('Dispatch to render component, and dispach if change "active only" element', async () => {
    const fakeBalances = makeFakeBalanceCollection().data;
    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Balances]: { balances: fakeBalances },
    });

    render(<MockPurchasesPage store={store} />);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockClear();

    await userEvent.click(screen.getByTestId('swich-active'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockClear();
  });
});
