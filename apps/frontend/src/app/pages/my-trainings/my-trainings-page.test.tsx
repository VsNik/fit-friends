import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Role } from '@fit-friends/shared';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { CardsOnPage, SliceName } from '../../constants/common';
import { MyTrainingsPage } from './my-trainings-page';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import { TrainingValidate } from '@fit-friends/libs/validation';

const COUNT_MOCK_TRAININGS = 3;

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockMyTrainingsPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <MyTrainingsPage />
      </Provider>
    </Router>
  );
};

describe('Component: Ny training page', () => {
  window.ResizeObserver = ResizeObserver;

  it('Correct render page', () => {
    const fakeTrainings = makeFakeTrainingCollection(COUNT_MOCK_TRAININGS).data;
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: {
        trainings: fakeTrainings,
        filter: {
          priceTo: TrainingValidate.PriceMin,
          durations: [],
        },
      },
    });

    render(<MockMyTrainingsPage store={store} />);

    expect(screen.getByTestId('my-training-filter')).toBeInTheDocument();

    const trainingCards = screen.getAllByTestId('thumbnail-training');
    expect(trainingCards.length).toEqual(COUNT_MOCK_TRAININGS);

    expect(screen.queryByTestId('show-more-button')).toBeNull();
  });

  it('Show "Load More" button, if trainings more than 6', () => {
    const fakeTrainings = makeFakeTrainingCollection(CardsOnPage.MyTraining + 1).data;
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: {
        trainings: fakeTrainings,
        page: 1,
        total: fakeTrainings.length,
        filter: {
          priceTo: TrainingValidate.PriceMin,
          durations: [],
        },
      },
    });

    render(<MockMyTrainingsPage store={store} />);
    expect(screen.getByTestId('show-more-button')).toBeInTheDocument();
  });
});
