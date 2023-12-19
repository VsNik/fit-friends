import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { TopMenu } from './top-menu';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import { RouteName } from '../../../constants/route';

const topMenuOptions = [
  { title: 'Home', url: RouteName.Home },
  { title: 'Cabinet', url: RouteName.Account },
  { title: 'Friends', url: RouteName.Friends },
];

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;

const MockTopMenu = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TopMenu />
      </Provider>
    </Router>
  );
};

describe('Component: Top Menu', () => {
  it('', () => {
    const store = mockStore({
      [SliceName.Notifications]: {},
    });

    render(<MockTopMenu store={store} />);

    const links = screen.getAllByTestId('top-menu-link');
    expect(links.length).toEqual(topMenuOptions.length);

    for (const link of links) {
      expect(link).toBeInTheDocument();
    }
  });
});
