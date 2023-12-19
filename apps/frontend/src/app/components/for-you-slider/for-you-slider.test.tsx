import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ForYouSlider } from './for-you-slider';
import { CountSlide, SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockForYouSlider = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ForYouSlider />
      </Provider>
    </Router>
  );
};

describe('Component: For You slider', () => {
  const fakeTrainings = makeFakeTrainingCollection(CountSlide.ForYou + 1).data;

  it('Correct render', () => {
    const store = mockStore({
      [SliceName.ForYou]: {trainings: fakeTrainings},
      [SliceName.Users]: { },
    });

    render(<MockForYouSlider store={store} />);

    expect(screen.getByText('Специально подобрано для вас')).toBeInTheDocument();

    const anonsCards = screen.getAllByTestId('thumbnail-training-anons');
    expect(anonsCards.length).toEqual(fakeTrainings.length);
    for (const card of anonsCards) {
      expect(card).toBeInTheDocument();
    }
  });

  it('Disabled prev button, if first slide', () => {
    const store = mockStore({
      [SliceName.ForYou]: {trainings: fakeTrainings},
      [SliceName.Users]: { },
    });

    render(<MockForYouSlider store={store} />);

    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Disabled next button, if last slide', async () => {
    const store = mockStore({
      [SliceName.ForYou]: {trainings: fakeTrainings},
      [SliceName.Users]: { },
    });

    render(<MockForYouSlider store={store} />);

    await userEvent.click(screen.getByTestId('next-slide'));
    expect(screen.getByTestId('prev-slide')).not.toBeDisabled();
    expect(screen.getByTestId('next-slide')).toBeDisabled();

    await userEvent.click(screen.getByTestId('prev-slide'));
    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Show stub, if empty users list', () => {
    const store = mockStore({
      [SliceName.ForYou]: {trainings: []},
      [SliceName.Users]: { },
    });
    render(<MockForYouSlider store={store} />);

    expect(screen.getByText('Скоро здесь появится что - то полезное')).toBeInTheDocument();
  });
});
