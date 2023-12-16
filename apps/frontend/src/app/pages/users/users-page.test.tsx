import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UsersPage } from './users-page';
import { Role } from '@fit-friends/shared';
import { SliceName } from '../../constants/common';
import { RouteName } from '../../constants/route';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
history.push(RouteName.Users);

const store = mockStore({
  [SliceName.Auth]: { authRole: Role.User },
  [SliceName.Notifications]: { notifications: [] },
  [SliceName.Users]: {
    users: [],
    filter: {
      location: [],
      types: [],
      level: '',
    },
  },
});

const MockUsersPage = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UsersPage />
      </Provider>
    </Router>
  );
};

describe('Component: Users page', () => {
  it('', () => {
    render(<MockUsersPage />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByTestId('to-home-button')).toBeInTheDocument();
    expect(screen.getByText('Фильтры')).toBeInTheDocument();
    expect(screen.getByTestId('users-filter-component')).toBeInTheDocument();
    expect(screen.getByTestId('users-catalog-component')).toBeInTheDocument();
  });
});
