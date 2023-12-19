import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingCardPage } from './training-card-page';
import { makeFakeTraining } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';
import { Role } from '@fit-friends/shared';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const fakeTraining = makeFakeTraining();
const store = mockStore({
  [SliceName.Auth]: {authRole: Role.User},
  [SliceName.Notifications]: {},
  [SliceName.Reviews]: { reviews: [] },
  [SliceName.Training]: { training: fakeTraining },
  [SliceName.Balance]: {},
  [SliceName.Order]: {},
});

const MockTrainingCardPage = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TrainingCardPage />
      </Provider>
    </Router>
  );
};

describe('Component: Training card', () => {
  it('Correct render components', () => {
    render(<MockTrainingCardPage/>);

    expect(screen.getByTestId('review-bar-component')).toBeInTheDocument();
    expect(screen.getByTestId('training-info-component')).toBeInTheDocument();
    expect(screen.getByTestId('training-video-component')).toBeInTheDocument();
  });

  it('Not editable at start', () => {
    render(<MockTrainingCardPage />);

    expect(screen.getByTestId('training-card-content').classList.contains('training-card--edit')).toBe(false);
  })

  it('Dispatch at start', () => {
    render(<MockTrainingCardPage />);

    expect(mockDispatch).toHaveBeenCalled();
    mockDispatch.mockReset();
  })
});
