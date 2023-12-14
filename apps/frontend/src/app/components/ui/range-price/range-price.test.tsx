import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ITraining } from '@fit-friends/shared';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingValidate } from '@fit-friends/libs/validation';
import { RangePrice } from './range-price';
import { makeFakeTrainingCollection } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const onChangedPrice = jest.fn();

const MockRangePrice = ({ store, trainings }: { store: MockStore; trainings: ITraining[] }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <RangePrice onChangedPrice={onChangedPrice} trainings={trainings} />
      </Provider>
    </Router>
  );
};

describe('Component: Range Price', () => {
  window.ResizeObserver = ResizeObserver;

  it('correct render', () => {
    const fakeTrainings = makeFakeTrainingCollection().data;

    const store = mockStore({
      [SliceName.Trainings]: {
        trainings: fakeTrainings,
        filter: {
          priceTo: TrainingValidate.PriceMin,
          durations: [],
        },
      },
    });

    render(<MockRangePrice store={store} trainings={fakeTrainings} />);

    expect(screen.getByText(/от/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-min-element')).toBeInTheDocument();

    expect(screen.getByText(/до/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-max-element')).toBeInTheDocument();
  });
});
