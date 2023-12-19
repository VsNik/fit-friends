import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Role } from '@fit-friends/shared';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { FriendsPage } from './friends-page';
import { SliceName } from '../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockFriendsPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <FriendsPage />
      </Provider>
    </Router>
  );
};

describe('Component: Friends-page', () => {
  it('Render user friends page if auth role User', () => {
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.Users]: {},
      [SliceName.Notifications]: {},
      [SliceName.Invites]: {},
    });

    render(<MockFriendsPage store={store} />);
    expect(screen.getByTestId('user-friends')).toBeInTheDocument();
  });

  it('Render coach friends page if auth role Coach', () => {
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.Users]: {},
      [SliceName.Notifications]: {},
      [SliceName.Invites]: {},
    });

    render(<MockFriendsPage store={store} />);
    expect(screen.getByTestId('coach-friends')).toBeInTheDocument();
  });
});
