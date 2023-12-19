import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Role } from '@fit-friends/shared';
import { makeFakeUserCollection } from '../../../utils/mock-data';
import { FriendsPage } from '../../../pages/friends/friends-page';
import { SliceName } from '../../../constants/common';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeUsersCollection = makeFakeUserCollection(6);
const fakeFriends = fakeUsersCollection.data;

it('Component: Coach-friends', () => {
  const store = mockStore({
    [SliceName.Auth]: { authRole: Role.Coach },
    [SliceName.Users]: { users: fakeFriends },
    [SliceName.Notifications]: {},
    [SliceName.Invites]: {},
  });

  render(
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <FriendsPage />
      </Provider>
    </Router>,
  );

  expect(screen.getByText('Назад')).toBeInTheDocument();
  expect(screen.getByText(/мои друзья/i)).toBeInTheDocument();
  expect(screen.getAllByTestId('friend-card').length).toBe(fakeFriends.length);
});
