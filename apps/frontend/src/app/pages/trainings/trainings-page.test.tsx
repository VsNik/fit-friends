import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingsPage } from './trainings-page';
import { SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockTrainingsPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TrainingsPage />
      </Provider>
    </Router>
  );
};

describe('Component: Trainings page', () => {
  window.ResizeObserver = ResizeObserver;

  it('Render component, and dispatch in first render', () => {
    const fakeTrainins = makeFakeTrainingCollection().data;
    const store = mockStore({
      [SliceName.Notifications]: {},
      [SliceName.Trainings]: {
        trainings: fakeTrainins,
        filter: {},
      },
    });

    render(<MockTrainingsPage store={store} />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByTestId('trainings-filter')).toBeInTheDocument();
    expect(screen.getByTestId('training-catalog')).toBeInTheDocument();
    
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockClear();
  });
});
