import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { CheckRating } from './check-rating';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

const MAX_RATING = 5;

const history = createMemoryHistory();
const mockOnChange = jest.fn();

const MockCheckRating = ({ value }: { value: number }) => {
  const methods = useForm();
  return (
    <Router location={history.location} navigator={history}>
      <FormProvider {...methods}>
        <CheckRating value={value} onChange={mockOnChange} />
      </FormProvider>
    </Router>
  );
};

describe('Component: Check rating', () => {
  it('Correct render', () => {
    render(<MockCheckRating value={0} />);

    const ratings = screen.getAllByTestId('checkbox-rating');
    expect(ratings.length).toEqual(MAX_RATING);
    ratings.forEach((item, i) => {
      expect(item).toBeInTheDocument();
      expect(screen.getByText(i + 1)).toBeInTheDocument();
      fireEvent.click(item);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      mockOnChange.mockClear();
    });
  });
});
