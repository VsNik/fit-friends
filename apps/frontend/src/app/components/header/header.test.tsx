import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Header } from './header';
import { SliceName } from '../../constants/common';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;

const MockHeader = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>
  );
};

describe('Component: Header', () => {
  it('', () => {
    const store = mockStore({
      [SliceName.Notifications]: {},
    });

    render(<MockHeader store={store} />);
    
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
    expect(screen.getByTestId('top-menu-component')).toBeInTheDocument();
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });
});
