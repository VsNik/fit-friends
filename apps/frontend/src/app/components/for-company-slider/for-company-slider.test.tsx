import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ForCompanySlider } from './for-company-slider';
import { CountSlide, SliceName } from '../../constants/common';
import { makeFakeUserCollection } from '../../utils/mock-data';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockForCompanySlider = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ForCompanySlider />
      </Provider>
    </Router>
  );
};

describe('Component: Certificate slider', () => {
  const fakeUsers = makeFakeUserCollection(CountSlide.Company + 1).data;

  it('Correct render', () => {
    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Users]: { users: fakeUsers },
    });

    render(<MockForCompanySlider store={store} />);

    expect(screen.getByText('Ищут компанию для тренировки')).toBeInTheDocument();
    expect(screen.getByTestId('to-home-buttom')).toBeInTheDocument();

    const userCards = screen.getAllByTestId('thumbnail-user');
    expect(userCards.length).toEqual(fakeUsers.length);
    for (const card of userCards) {
      expect(card).toBeInTheDocument();
    }
  });

  it('Disabled prev button, if first slide', () => {
    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Users]: { users: fakeUsers },
    });

    render(<MockForCompanySlider store={store} />);

    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Disabled next button, if last slide', async () => {
    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Users]: { users: fakeUsers },
    });

    render(<MockForCompanySlider store={store} />);

    await userEvent.click(screen.getByTestId('next-slide'));
    expect(screen.getByTestId('prev-slide')).not.toBeDisabled();
    expect(screen.getByTestId('next-slide')).toBeDisabled();

    await userEvent.click(screen.getByTestId('prev-slide'));
    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Show stub, if empty users list', () => {
    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Users]: { users: [] },
    });
    render(<MockForCompanySlider store={store} />);

    expect(screen.getByText('Скоро здесь появится что - то полезное')).toBeInTheDocument();
  });
});
