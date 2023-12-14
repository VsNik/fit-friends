import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingCatalog } from './training-catalog';
import { SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockShowMore = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockTrainingCatalog = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TrainingCatalog onShowMore={mockShowMore} page={1} />
      </Provider>
    </Router>
  );
};

describe('Component: Trainings page', () => {
  window.ResizeObserver = ResizeObserver;

  it('Correct render trainings cards, and no visible button "Show More" if count trainings <= 6', () => {
    const COUNT_TRAININGS = 6;
    const fakeTrainins = makeFakeTrainingCollection(COUNT_TRAININGS).data;

    const store = mockStore({
      [SliceName.Trainings]: {
        trainings: fakeTrainins,
        page: 1,
        total: fakeTrainins.length,
      },
    });

    render(<MockTrainingCatalog store={store} />);

    const cards = screen.getAllByTestId('thumbnail-training');
    expect(cards.length).toEqual(COUNT_TRAININGS);

    expect(screen.queryByTestId('show-more-button')).toBeNull();
  });

  it('Visible button "Show More" if count trainings > 6', () => {
    const COUNT_TRAININGS = 7;
    const fakeTrainins = makeFakeTrainingCollection(COUNT_TRAININGS).data;

    const store = mockStore({
      [SliceName.Trainings]: {
        trainings: fakeTrainins,
        page: 1,
        total: fakeTrainins.length,
      },
    });

    render(<MockTrainingCatalog store={store} />);

    const cards = screen.getAllByTestId('thumbnail-training');
    expect(cards.length).toEqual(COUNT_TRAININGS);

    expect(screen.queryByTestId('show-more-button')).not.toBeNull();
  });

  it('Click "Show More" button', async () => {
    const COUNT_TRAININGS = 7;
    const fakeTrainins = makeFakeTrainingCollection(COUNT_TRAININGS).data;

    const store = mockStore({
      [SliceName.Trainings]: {
        trainings: fakeTrainins,
        page: 1,
        total: fakeTrainins.length,
      },
    });

    render(<MockTrainingCatalog store={store} />);

    await userEvent.click(screen.getByTestId('show-more-button'))
    expect(mockShowMore).toHaveBeenCalledTimes(1);
  });
});
