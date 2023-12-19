import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { IUser, Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';
import { FriendsButton } from './friends-button';
import { makeFakeUser } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockFriendsButton = ({ store, user }: { store: MockStore; user: IUser }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <FriendsButton user={user} />
      </Provider>
    </Router>
  );
};

describe('Component: Friends button', () => {
  it('If not friend, and role user', () => {
    const fakeUser = { ...makeFakeUser(), isFollow: false };
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
    });

    render(<MockFriendsButton store={store} user={fakeUser} />);

    expect(screen.getByText('Добавить в друзья')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('If friend, and role user', () => {
    const fakeUser = { ...makeFakeUser(), isFollow: true };
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
    });

    render(<MockFriendsButton store={store} user={fakeUser} />);

    expect(screen.getByText('Удалить из друзей')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('If not friend, and role coach', () => {
    const fakeUser = { ...makeFakeUser(), isFollow: false };
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
    });

    render(<MockFriendsButton store={store} user={fakeUser} />);

    expect(screen.getByText('Добавить в друзья')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('If friend, and role coach', () => {
    const fakeUser = { ...makeFakeUser(), isFollow: true };
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
    });

    render(<MockFriendsButton store={store} user={fakeUser} />);

    expect(screen.getByText('Удалить из друзей')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('Dispatch if change status', async () => {
    const fakeUser = { ...makeFakeUser(), isFollow: false };
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
    });

    render(<MockFriendsButton store={store} user={fakeUser} />);

    await userEvent.click(screen.getByRole('button'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
