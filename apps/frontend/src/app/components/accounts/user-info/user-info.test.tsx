import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IUser, Role } from '@fit-friends/shared';
import { SliceName } from '../../../constants/common';
import { makeFakeUser } from '../../../utils/mock-data';
import { UserInfo } from './user-info';
import userEvent from "@testing-library/user-event";

const DEFAULT_AVATAR = '/assets/img/default_avatar.png';

const mockStore = configureMockStore([thunk]);
type StoreType = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockUserInfo = (props: { fakeUser: IUser; store: StoreType }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={props.store}>
        <UserInfo user={props.fakeUser} />
      </Provider>
    </Router>
  );
};

describe('Component: user-info', () => {
  it('should render correctly if exist avatar', () => {
    const fakeUser = makeFakeUser(Role.User);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockUserInfo fakeUser={fakeUser} store={store} />);

    expect(screen.getByTestId('user-info-avatar')).toHaveAttribute('src', fakeUser.avatar);
  });

  it('should render correctly if not exist avatar', () => {
    const fakeUser = makeFakeUser(Role.User);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: Object.assign(fakeUser, (fakeUser.avatar = '')) },
      [SliceName.Notifications]: {},
    });

    render(<MockUserInfo fakeUser={fakeUser} store={store} />);

    expect(screen.getByTestId('user-info-avatar')).toHaveAttribute('src', DEFAULT_AVATAR);
  });

  it('should render correctly control buttons if edit mode', async () => {
    const fakeUser = makeFakeUser(Role.User);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockUserInfo fakeUser={fakeUser} store={store} />);

    const button = screen.getByTestId("set-edit-btn")

    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId('user-edit-controls')).toBeNull();

    await userEvent.click(button)

    expect(screen.queryByTestId('set-edit-btn')).toBeNull();
    expect(screen.getByTestId('user-edit-controls')).toBeInTheDocument();
  });
});