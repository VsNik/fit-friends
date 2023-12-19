import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { SpecialSlider } from './special-slider';
import { SliceName } from '../../constants/common';
import { makeFakeTrainingCollection } from '../../utils/mock-data';
import { SlidesMaxCount } from '@fit-friends/shared';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockSpecialSlider = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <SpecialSlider />
      </Provider>
    </Router>
  );
};

describe('Component: Special slider slider', () => {
  const fakeTrainings = makeFakeTrainingCollection(SlidesMaxCount.Special).data;

  it('Correct render slides', () => {
    const store = mockStore({
      [SliceName.Special]: { trainings: fakeTrainings },
    });

    render(<MockSpecialSlider store={store} />);

    expect(screen.getByText('Специальные предложения')).toBeInTheDocument();

    const slides = screen.getAllByTestId('promo-image');
    expect(slides.length).toEqual(fakeTrainings.length);
    for (const slide of slides) {
      expect(slide).toBeInTheDocument();
    }
  });
});
