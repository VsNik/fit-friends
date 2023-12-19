import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { PaymentType } from '@fit-friends/shared';
import { CheckPayment } from './check-payment';
import { fireEvent, render, screen } from '@testing-library/react';

const history = createMemoryHistory();
const mockOnChange = jest.fn();

const MockCheckPayment = ({ value, disabled = false }: { value: PaymentType; disabled?: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <CheckPayment value={value} onChange={mockOnChange} disabled={disabled} />
    </Router>
  );
};

describe('Component: Check payment', () => {
  it('Click buttons', () => {
    render(<MockCheckPayment value={PaymentType.Mir} />);

    const paymentTypes = screen.getAllByTestId('checkbox-payment-type');
    expect(paymentTypes.length).toEqual(Object.values(PaymentType).length);

    paymentTypes.forEach( (type) => {
        expect(type).toBeInTheDocument();
        expect(type).not.toBeDisabled();
        fireEvent.click(type);
        expect(mockOnChange).toHaveBeenCalled();
    })    
  });

  it('Disabled if passet disabled parametr', () => {
    render(<MockCheckPayment value={PaymentType.Mir} disabled />);

    const paymentTypes = screen.getAllByTestId('checkbox-payment-type');

    paymentTypes.forEach( (type) => {
        expect(type).toBeDisabled();
    })    
  });
});
