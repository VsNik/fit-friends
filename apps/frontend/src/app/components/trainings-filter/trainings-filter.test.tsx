import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingsFilter } from './trainings-filter';
import { SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const COUNT_TRAININGS = 6;
const fakeTrainins = makeFakeTrainingCollection(COUNT_TRAININGS).data;

const store = mockStore({
  [SliceName.Trainings]: {
    trainings: fakeTrainins,
    filter: {},
  },
});

const MockTrainingCatalog = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TrainingsFilter />
      </Provider>
    </Router>
  );
};

describe('Component: Trainings page', () => {
  window.ResizeObserver = ResizeObserver;

  it('Correct render trainings filter', () => {
    render(<MockTrainingCatalog />);

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByTestId('price-range-slider')).toBeInTheDocument();
    expect(screen.getByText('Калории')).toBeInTheDocument();
    expect(screen.getByTestId('calory-range-slider')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByTestId('rating-range-slider')).toBeInTheDocument();
    expect(screen.getByText('Сортировка')).toBeInTheDocument();
    expect(screen.getByText('Дешевле')).toBeInTheDocument();
    expect(screen.getByText('Дороже')).toBeInTheDocument();
    expect(screen.getByText('Бесплатные')).toBeInTheDocument();

    const types = screen.getAllByTestId('checkbox-filter-type');
    for (const type of types) {
      expect(type).toBeInTheDocument();
    }

    const sortings = screen.getAllByTestId('radio-sorting-price');
    for (const sort of sortings) {
        expect(sort).toBeInTheDocument();
    }
  });

  it('Dispatch if change training type filter', async () => {
    render(<MockTrainingCatalog />);

    const types = screen.getAllByTestId('checkbox-filter-type');
    for (const type of types) {
      fireEvent.click(type);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      mockDispatch.mockClear();
    }
  });

  it('Dispatch if change price sorting', async () => {
    render(<MockTrainingCatalog />);

    const sortings = screen.getAllByTestId('radio-sorting-price');
    for (const sort of sortings) {
      fireEvent.click(sort);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      mockDispatch.mockClear();
    }
  });
});
