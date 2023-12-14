import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { IAlert } from '@fit-friends/shared';
import { ThumbnailNotification } from './thumbnail-notification';
import { makeFakeNotifications } from '../../../utils/mock-data';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SliceName } from '../../../constants/common';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const MockThumbnailNotification = ({ store, notification }: { store: MockStore; notification: IAlert }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ThumbnailNotification notification={notification} />
      </Provider>
    </Router>
  );
};

describe('Component: Thumbnail Notification', () => {
  it('', async () => {
    const fakeNitifys = makeFakeNotifications(1).data;

    const store = mockStore({
      [SliceName.Notifications]: { notifications: fakeNitifys },
    });

    render(<MockThumbnailNotification store={store} notification={fakeNitifys[0]} />);

    expect(screen.getByTestId('totification-text').textContent).toBe(fakeNitifys[0].text);
    expect(screen.getByTestId('notification-date').textContent).toBe(fakeNitifys[0].createdAt);

    await userEvent.click(screen.getByTestId('totification-text'));
    expect(mockDispatch).toHaveBeenCalled();

    mockDispatch.mockClear();
  });
});
