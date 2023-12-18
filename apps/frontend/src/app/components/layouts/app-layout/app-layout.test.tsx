import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import { AppLayout } from './app-layout';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  [SliceName.Notifications]: {},
});

const MockChildren: React.FC = () => <title>mock-children</title>;

const MockAppLayout = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <AppLayout>
          <MockChildren />
        </AppLayout>
      </Provider>
    </Router>
  );
};

describe('Component: App Layout', () => {
  it('Correct render element', () => {
    render(<MockAppLayout />);

    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('top-menu-component')).toBeInTheDocument();
    expect(screen.getByTestId('search-component')).toBeInTheDocument();

    expect(screen.getByText('mock-children')).toBeInTheDocument();
  });
});
