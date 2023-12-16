import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserCardTrainingSlider } from './user-card-training-slider';
import userEvent from '@testing-library/user-event';
import { ITraining } from '@fit-friends/shared';
import { CountSlide, SliceName } from '../../../constants/common';
import { makeFakeTrainingCollection } from '../../../utils/mock-data';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockUserCardTrainingSlider = ({ store, trainings }: { store: MockStore; trainings: ITraining[] }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserCardTrainingSlider trainings={trainings} />
      </Provider>
    </Router>
  );
};

describe('Component User card trainings slider', () => {
  const fakeTrainings = makeFakeTrainingCollection(CountSlide.CoachCard + 1).data;

  it('Correct render component', () => {
    const store = mockStore({
      [SliceName.Popular]: { trainings: fakeTrainings },
    });

    render(<MockUserCardTrainingSlider store={store} trainings={fakeTrainings} />);

    expect(screen.getByText('Тренировки')).toBeInTheDocument();
    expect(screen.getByTestId('prev-slide')).toBeInTheDocument();
    expect(screen.getByTestId('next-slide')).toBeInTheDocument();

    const slides = screen.getAllByTestId('thumbnail-training');
    expect(slides.length).toEqual(fakeTrainings.length);
    for (const slide of slides) {
      expect(slide).toBeInTheDocument();
    }
  });

  it('Disabled prev button, if first slide and disabled next button if last slide', async () => {
    const store = mockStore({
      [SliceName.Popular]: { trainings: fakeTrainings },
    });

    render(<MockUserCardTrainingSlider store={store} trainings={fakeTrainings} />);

    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();

    await userEvent.click(screen.getByTestId('next-slide'));
    expect(screen.getByTestId('prev-slide')).not.toBeDisabled();
    expect(screen.getByTestId('next-slide')).toBeDisabled();

    await userEvent.click(screen.getByTestId('prev-slide'));
    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });
});
