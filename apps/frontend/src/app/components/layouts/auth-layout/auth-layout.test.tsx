import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { AuthLayout } from './auth-layout';

const history = createMemoryHistory();

const MockChildren: React.FC = () => <title>mock-children</title>;

const MockAppLayout = () => {
  return (
    <Router location={history.location} navigator={history}>
      <AuthLayout>
        <MockChildren />
      </AuthLayout>
    </Router>
  );
};

describe('Component: Auth Layout', () => {
  it('Correct render element', () => {
    render(<MockAppLayout />);

    expect(screen.getByTestId('auth-layout-component')).toBeInTheDocument();
    expect(screen.getByText('mock-children')).toBeInTheDocument();
  });
});
