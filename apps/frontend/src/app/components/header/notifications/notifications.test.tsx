import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Role } from '@fit-friends/shared';
import { Notifications } from './notifications';
import { SliceName } from '../../../constants/common';
import { makeFakeNotifications } from '../../../utils/mock-data';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const fakeNotify = makeFakeNotifications().data;

const store = mockStore({
  [SliceName.Auth]: { authRole: Role.User },
  [SliceName.Notifications]: {notifications: fakeNotify},
});

const MockNotifications = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <Notifications />
      </Provider>
    </Router>
  );
};

describe('Component: Notifications', () => {
  it('Correct render notify list', () => {
    render(<MockNotifications />);

    const notifications = screen.getAllByTestId('totification-text');
    expect(notifications.length).toEqual(fakeNotify.length);
    notifications.forEach((notify) => {
        expect(notify).toBeInTheDocument();
    })
  });
});
