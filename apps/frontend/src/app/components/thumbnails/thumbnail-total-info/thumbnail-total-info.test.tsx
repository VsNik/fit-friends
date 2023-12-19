import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThumbnailTotalInfo } from './thumbnail-total-info';

const MOCK_ORDERS_COUNT = 2;
const MOCK_TOTAL_SUMM = 2000;

const history = createMemoryHistory();

const MockThumbnailTotalInfo = ({ count, summ }: { count: number; summ: number }) => {
  return (
    <Router location={history.location} navigator={history}>
      <ThumbnailTotalInfo count={count} summ={summ} />
    </Router>
  );
};

describe('Component: Thumbnail total info', () => {
  it('Corect render component', () => {
    render(<MockThumbnailTotalInfo count={MOCK_ORDERS_COUNT} summ={MOCK_TOTAL_SUMM} />);

    expect(screen.getByText('Куплено тренировок')).toBeInTheDocument();
    expect(screen.getByTestId('training-orders').textContent).toBe(`${MOCK_ORDERS_COUNT}`);
    expect(screen.getByText('Общая сумма')).toBeInTheDocument();
    expect(screen.getByTestId('training-total-summ').textContent).toBe(`${MOCK_TOTAL_SUMM}₽`);
  });
});
