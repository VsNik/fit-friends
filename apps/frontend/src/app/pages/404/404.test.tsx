import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { NotFound } from './404';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <NotFound />
      </Router>,
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
