import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router, generatePath } from 'react-router-dom';
import { ThumbnailTrainingAnons } from './thumbnails-training-anons';
import { ITraining } from '@fit-friends/shared';
import { makeFakeTraining } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { ApiTrainings } from '../../../constants/route';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockThumbnailTrainingAnons = ({ store, training }: { store: MockStore; training: ITraining }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ThumbnailTrainingAnons training={training} />
      </Provider>
    </Router>
  );
};

describe('Component: Thumbnail Training anons', () => {
  it('Corect render component', () => {
    const fakeTraining = makeFakeTraining();

    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockThumbnailTrainingAnons store={store} training={fakeTraining} />);

    expect(screen.getByTestId('training-bg')).toHaveAttribute('src', fakeTraining.bgImage);
    expect(screen.getByTestId('training-type').textContent).toBe(fakeTraining.type);
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toHaveAttribute('href', generatePath(ApiTrainings.Show, {id: fakeTraining.id}));
  });
});
