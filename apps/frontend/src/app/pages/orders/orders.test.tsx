import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { OrdersPage } from './orders-page';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';
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

const MockOrdersPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <OrdersPage />
      </Provider>
    </Router>
  );
};

describe('Component: Order page', () => {
  it('Correct render and no "Show More" button if orders <= 4', () => {
    const TRAINING_COUNT = 4;
    const fakeTrainings = makeFakeTrainingCollection(TRAINING_COUNT).data;

    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: { trainings: fakeTrainings },
    });

    render(<MockOrdersPage store={store} />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Мои заказы')).toBeInTheDocument();
    expect(screen.getByText('Сортировать по:')).toBeInTheDocument();
    expect(screen.getByText(TextSortTo.Summ)).toBeInTheDocument();
    expect(screen.getByText(TextSortTo.Count)).toBeInTheDocument();

    const thumbnails = screen.getAllByTestId('thumbnail-training');
    expect(thumbnails.length).toEqual(TRAINING_COUNT);

    expect(screen.queryByTestId('show-more-button')).not.toBeInTheDocument();
  });

  it('Show statistics', () => {
    const TRAINING_COUNT = 4;
    const fakeTrainings = makeFakeTrainingCollection(TRAINING_COUNT).data;

    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: { trainings: fakeTrainings },
    });

    render(<MockOrdersPage store={store} />);

    const statistics = screen.getAllByTestId('thumbnail-training-info');
    expect(statistics.length).toEqual(TRAINING_COUNT);
  });

  it('Visible "Show More" button if orders > 4', () => {
    const TRAINING_COUNT = 5;
    const fakeTrainings = makeFakeTrainingCollection(TRAINING_COUNT).data;

    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: { trainings: fakeTrainings, page: 1, total: fakeTrainings.length },
    });

    render(<MockOrdersPage store={store} />);

    expect(screen.getByTestId('show-more-button')).toBeInTheDocument();
  });

  it('Dispatch if "Show More" button click', async () => {
    const TRAINING_COUNT = 5;
    const fakeTrainings = makeFakeTrainingCollection(TRAINING_COUNT).data;

    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: { trainings: fakeTrainings, page: 1, total: fakeTrainings.length },
    });

    render(<MockOrdersPage store={store} />);

    await userEvent.click(screen.getByTestId('show-more-button'));

    expect(mockDispatch).toBeCalled();
    mockDispatch.mockClear();
  });
});
