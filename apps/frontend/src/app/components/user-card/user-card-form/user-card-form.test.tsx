import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserCardForm } from './user-card-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { IUser, Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';
import { makeFakeUser } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockUserCardForm = ({ store, user }: { store: MockStore; user: IUser }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserCardForm user={user} />
      </Provider>
    </Router>
  );
};

describe('Component: User card form', () => {
  it('Coach ready to training and is friend', () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: true, isFollow: true };

    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Trainings]: { trainings: [] },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardForm store={store} user={fakeUser} />);

    expect(screen.getByText('Хочу персональную тренировку')).toBeInTheDocument();
    expect(screen.getByText('Получать уведомление на почту о новой тренировке')).toBeInTheDocument();
  });

  it('Coach not ready to training and is friend', () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: false, isFollow: true };

    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Trainings]: { trainings: [] },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardForm store={store} user={fakeUser} />);

    expect(screen.queryByText('Хочу персональную тренировку')).not.toBeInTheDocument();
    expect(screen.getByText('Получать уведомление на почту о новой тренировке')).toBeInTheDocument();
  });

  it('Coach ready to training and is not friend', () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: false, isFollow: false };

    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Trainings]: { trainings: [] },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardForm store={store} user={fakeUser} />);

    expect(screen.queryByText('Хочу персональную тренировку')).not.toBeInTheDocument();
    expect(screen.getByText('Получать уведомление на почту о новой тренировке')).toBeInTheDocument();
  });

  it('Dispatch if click request to personal training', async () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: true, isFollow: true };

    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Trainings]: { trainings: [] },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardForm store={store} user={fakeUser} />);

    await userEvent.click(screen.getByTestId('personal-request'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockClear();
  });

  it('Dispatch if check subscribe', async () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: true, isFollow: true };

    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Trainings]: { trainings: [] },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardForm store={store} user={fakeUser} />);

    await userEvent.click(screen.getByTestId('notify-subscribe'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockClear();
  });
});
