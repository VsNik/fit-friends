import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import { StatisticSorting, TrainingSortDirection } from '@fit-friends/shared';
import { ButtonsSorting } from './buttons-sorting';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

enum TextSortTo {
  Summ = 'Сумме',
  Count = 'Количеству',
}

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockButtonsSorting = ({ store, sorting, direction }: { store: MockStore; sorting: StatisticSorting; direction: TrainingSortDirection }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ButtonsSorting sorting={sorting} direction={direction} />
      </Provider>
    </Router>
  );
};

describe('Component: Buttons sorting', () => {
  it('Show buttons text', async () => {
    const store = mockStore({
      [SliceName.Trainings]: {},
    });

    render(<MockButtonsSorting store={store} sorting={StatisticSorting.OrderCount} direction={TrainingSortDirection.Desc} />);

    expect(screen.getByText(TextSortTo.Count)).toBeInTheDocument();
    expect(screen.getByText(TextSortTo.Summ)).toBeInTheDocument();
  });

  it('Celled dispatch if click to sorting summ', async () => {
    const store = mockStore({
      [SliceName.Trainings]: {},
    });

    render(<MockButtonsSorting store={store} sorting={StatisticSorting.OrderCount} direction={TrainingSortDirection.Desc} />);

    const button = screen.getByTestId('sorting-summ');
    await userEvent.click(button);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('Celled dispatch if click to sorting count', async () => {
    const store = mockStore({
      [SliceName.Trainings]: {},
    });

    render(<MockButtonsSorting store={store} sorting={StatisticSorting.OrderCount} direction={TrainingSortDirection.Desc} />);

    const button = screen.getByTestId('sorting-count');
    await userEvent.click(button);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
