import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserNavigation } from './user-vavigation';

const history = createMemoryHistory();

describe('Component: user-calories', () => {
  it('should render correctly', () => {
    render(
      <Router location={history.location} navigator={history}>
        <UserNavigation />
      </Router>,
    );

    expect(screen.getByText(/Мои друзья/i)).toBeInTheDocument();
    expect(screen.getByText(/Мои покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Скоро тут появится что-то полезное/i)).toBeInTheDocument();
  });
});
