import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { CoachNavigation } from './coach-navigation';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SliceName } from '../../../constants/common';
import { Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: user-calories', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.User]: {},
    });

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <CoachNavigation />
        </Provider>
      </Router>,
    );

    expect(screen.getByText(/Мои тренировки/i)).toBeInTheDocument();
    expect(screen.getByText(/Создать тренировку/i)).toBeInTheDocument();
    expect(screen.getByText(/Мои друзья/i)).toBeInTheDocument();
    expect(screen.getByText(/Мои заказы/i)).toBeInTheDocument();
    expect(screen.getByText(/Скоро тут будет интересно/i)).toBeInTheDocument();
  });
});
