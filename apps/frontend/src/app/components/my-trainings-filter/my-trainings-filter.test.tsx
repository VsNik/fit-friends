import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import { MyTrainingsFilter } from './my-trainings-filter';

const COUNT_MOCK_TRAININGS = 3;

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockMMyTrainingsFilter = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <MyTrainingsFilter />
      </Provider>
    </Router>
  );
};

describe('Component: My training filter', () => {
  window.ResizeObserver = ResizeObserver;

  it('', async () => {
    const fakeTrainings = makeFakeTrainingCollection(COUNT_MOCK_TRAININGS).data;

    const store = mockStore({
      [SliceName.Trainings]: {
        trainings: fakeTrainings,
        filter: {
          durations: [],
        },
      },
    });

    render(<MockMMyTrainingsFilter store={store} />);

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByTestId('price-range-slider')).toBeInTheDocument();
    expect(screen.getByText('Калории')).toBeInTheDocument();
    expect(screen.getByTestId('calory-range-slider')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByTestId('rating-range-slider')).toBeInTheDocument();

    expect(screen.getByText('Длительность')).toBeInTheDocument();
    const durations = screen.getAllByTestId('checkbox-duration-group');
    for (const el of durations) {
      expect(el).toBeInTheDocument();
    }
  });
});
