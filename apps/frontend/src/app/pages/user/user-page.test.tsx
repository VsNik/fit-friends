import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserPage } from './user-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';
import { makeFakeUser } from '../../utils/mock-data';
import { SliceName } from '../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockUserPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserPage />
      </Provider>
    </Router>
  );
};

describe('Component: User page', () => {
  it('Render for user role', () => {
    const fakeUser = makeFakeUser(Role.User);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.Notifications]: {},
      [SliceName.User]: { user: fakeUser },
      [SliceName.Trainings]: {},
    });

    render(<MockUserPage store={store} />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByTestId('user-card-component')).toBeInTheDocument();
    expect(screen.queryByTestId('coach-card-component')).not.toBeInTheDocument();
    expect(screen.getByTestId('modal-map-component')).toBeInTheDocument();
    expect(screen.queryByTestId('certificate-modal-component')).not.toBeInTheDocument();
  });

  it('Render for user role', () => {
    const fakeUser = makeFakeUser(Role.Coach);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.Notifications]: {},
      [SliceName.User]: { user: fakeUser },
      [SliceName.Trainings]: { trainings: [] },
    });

    render(<MockUserPage store={store} />);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByTestId('coach-card-component')).toBeInTheDocument();
    expect(screen.queryByTestId('user-card-component')).not.toBeInTheDocument();
    expect(screen.getByTestId('modal-map-component')).toBeInTheDocument();
    expect(screen.getByTestId('certificate-modal-component')).toBeInTheDocument();
  });
});
