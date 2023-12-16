import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { BuyPopup } from './buy-popup';
import { PaymentType } from '@fit-friends/shared';
import userEvent from '@testing-library/user-event';
import { makeFakeTraining } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';

const MOCK_TITLE = 'some-title';
const MOCK_COUNT = 10;

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const mockOnClose = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const store = mockStore({
    [SliceName.Order]: {}
});

const fakeTraining = makeFakeTraining();

const MockBuyPopup = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <BuyPopup training={fakeTraining} title={MOCK_TITLE} onClose={mockOnClose} />
      </Provider>
    </Router>
  );
};

describe('Component: Buy Popup', () => {
  it('', () => {
    render(<MockBuyPopup />);

    expect(screen.getByText(MOCK_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId('close-popup-button')).toBeInTheDocument();

    expect(screen.getByTestId('training-image')).toHaveAttribute('src', fakeTraining.bgImage);
    expect(screen.getByText(fakeTraining.title)).toBeInTheDocument();
    expect(screen.getByText(`${fakeTraining.price} ₽`)).toBeInTheDocument();

    expect(screen.getByTestId('check-count-decrement')).toBeInTheDocument();
    expect(screen.getByTestId('check-count-increment')).toBeInTheDocument();
    expect(screen.getByTestId('check-count-input')).toBeInTheDocument();

    expect(screen.getByText('Выберите способ оплаты')).toBeInTheDocument();

    const paymentTypes = screen.getAllByTestId('checkbox-payment-type');
    expect(paymentTypes.length).toEqual(Object.values(PaymentType).length);
    paymentTypes.forEach((type) => expect(type).toBeInTheDocument());
  });

  it('Click to increment/decrement', async () => {
    render(<MockBuyPopup />);

    expect(screen.getByDisplayValue(0)).toBeInTheDocument();
    expect(screen.getByTestId('check-count-decrement')).toBeDisabled();
    expect(screen.getByTestId('total-price-element').textContent).toBe(`0 ₽`)

    await userEvent.click(screen.getByTestId('check-count-increment'));
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
    expect(screen.getByTestId('check-count-decrement')).not.toBeDisabled();
    expect(screen.getByTestId('total-price-element').textContent).toBe(`${fakeTraining.price} ₽`)

    await userEvent.click(screen.getByTestId('check-count-decrement'));
    expect(screen.getByDisplayValue(0)).toBeInTheDocument();
    expect(screen.getByTestId('check-count-decrement')).toBeDisabled();
    expect(screen.getByTestId('total-price-element').textContent).toBe(`0 ₽`)
  })

  it('Click to Buy button', async () => {
    render(<MockBuyPopup />);

    await userEvent.click(screen.getByTestId('check-count-increment'));
    await userEvent.click(screen.getAllByTestId('checkbox-payment-type')[0]);

    await userEvent.click(screen.getByTestId('buy-cutton-element'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockClear();
  })

  it('Enter cuont from keyboard', async () => {
    render(<MockBuyPopup />);

    await userEvent.type(screen.getByTestId('check-count-input'), `${MOCK_COUNT}`);
    expect(screen.getByDisplayValue(MOCK_COUNT)).toBeInTheDocument();
    expect(screen.getByTestId('total-price-element').textContent).toBe(`${fakeTraining.price * MOCK_COUNT} ₽`)
  });

  it('Click close button', async () => {
    render(<MockBuyPopup />);

    await userEvent.click(screen.getByTestId('close-popup-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  })
});
