import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { makeFakeUser } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';
import { Provider } from 'react-redux';
import { Role } from '@fit-friends/shared';
import { AccountPage } from './account-page';
import { RouteName } from '../../constants/route';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockAccountPage = (props: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={props.store}>
        <AccountPage />
      </Provider>
    </Router>
  );
};

describe('Component: account-page', () => {
  it('should render correctly for user role', () => {
    history.push(RouteName.Account);
    const fakeUser = makeFakeUser(Role.User);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockAccountPage store={store} />);

    expect(screen.getByTestId('user-info-bar')).toBeInTheDocument();
    expect(screen.getByTestId('user-calories-block')).toBeInTheDocument();
    expect(screen.getByTestId('user-navigation-block')).toBeInTheDocument();
  });

  it('should render correctly for coach role', () => {
    history.push(RouteName.Account);

    const fakeUser = makeFakeUser(Role.Coach);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockAccountPage store={store} />);

    expect(screen.getByTestId('user-info-bar')).toBeInTheDocument();
    expect(screen.getByTestId('coach-navigation-block')).toBeInTheDocument();
    expect(screen.getByTestId('coach-certificate-block')).toBeInTheDocument();
  });

  it('Dispatc if click to Notification send button', async () => {
    history.push(RouteName.Account);

    const fakeUser = makeFakeUser(Role.Coach);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockAccountPage store={store} />);

    await userEvent.click(screen.getByTestId('send-totify-button'));
    expect(mockDispatch).toHaveBeenCalled();
    mockDispatch.mockClear();
  })

  it('Dispatc when first render', async () => {
    history.push(RouteName.Account);

    const fakeUser = makeFakeUser(Role.Coach);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockAccountPage store={store} />);

    expect(mockDispatch).toHaveBeenCalled();
    mockDispatch.mockClear();
  })
});
