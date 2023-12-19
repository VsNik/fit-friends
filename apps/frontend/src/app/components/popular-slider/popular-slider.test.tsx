import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { PopularSlider } from './popular-slider';
import { CountSlide, SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockPopularSlider = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <PopularSlider />
      </Provider>
    </Router>
  );
};

describe('Component: Popular slider', () => {
  const fakeTrainings = makeFakeTrainingCollection(CountSlide.Popular + 1).data;

  it('Correct render', () => {
    const store = mockStore({
      [SliceName.Popular]: {trainings: fakeTrainings},
    });

    render(<MockPopularSlider store={store} />);

    expect(screen.getByText('Популярные тренировки')).toBeInTheDocument();
    expect(screen.getByTestId('to-home-button')).toBeInTheDocument();

    const trainingCards = screen.getAllByTestId('thumbnail-training');
    expect(trainingCards.length).toEqual(fakeTrainings.length);
    for (const card of trainingCards) {
      expect(card).toBeInTheDocument();
    }
  });

  it('Disabled prev button, if first slide', () => {
    const store = mockStore({
      [SliceName.Popular]: {trainings: fakeTrainings},
    });

    render(<MockPopularSlider store={store} />);

    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Disabled next button, if last slide', async () => {
    const store = mockStore({
      [SliceName.Popular]: {trainings: fakeTrainings},
    });

    render(<MockPopularSlider store={store} />);

    await userEvent.click(screen.getByTestId('next-slide'));
    expect(screen.getByTestId('prev-slide')).not.toBeDisabled();
    expect(screen.getByTestId('next-slide')).toBeDisabled();

    await userEvent.click(screen.getByTestId('prev-slide'));
    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Show stub, if empty users list', () => {
    const store = mockStore({
      [SliceName.Popular]: {trainings: []},
    });
    render(<MockPopularSlider store={store} />);

    expect(screen.getByText('Скоро здесь появится что - то полезное')).toBeInTheDocument();
  });
});
