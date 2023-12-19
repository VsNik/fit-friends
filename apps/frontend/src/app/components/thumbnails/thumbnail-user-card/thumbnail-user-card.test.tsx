import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ThumbnailUserCard } from './thumbnail-user-card';
import { IUser, Role } from '@fit-friends/shared';
import { makeFakeUser } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { getUserLocation } from '../../../utils/helpers';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockThumbnailUserCard = ({ store, user, dark }: { store: MockStore; user: IUser; dark?: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ThumbnailUserCard user={user} dark={dark} />
      </Provider>
    </Router>
  );
};

describe('Component: Thumbnail user card', () => {
  it('Corect render component', () => {
    const fakeUser = makeFakeUser();

    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockThumbnailUserCard store={store} user={fakeUser} />);

    expect(screen.getByTestId('user-avatar-element')).toHaveAttribute('src', fakeUser.avatar);
    expect(screen.getByTestId('thumbnail-user-name').textContent).toBe(fakeUser.name);
    expect(screen.getByTestId('thumbnail-user-location').textContent).toBe(getUserLocation(fakeUser.location).title);

    const types = screen.getAllByTestId('thumbnail-user-type');
    expect(types.length).toEqual(fakeUser.trainingType?.length);
    for (const el of types) {
      expect(el).toBeInTheDocument();
    }

    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  it('set class for dark background', () => {
    const fakeUser = makeFakeUser();

    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockThumbnailUserCard store={store} user={fakeUser} dark />);

    expect(screen.getByTestId('thumbnail-user').classList.contains('thumbnail-user--dark')).toBe(true);
  });

  it('set dark catd background, if role "Coach"', () => {
    const fakeUser = makeFakeUser(Role.Coach);

    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockThumbnailUserCard store={store} user={fakeUser} />);

    expect(screen.getByTestId('thumbnail-user').classList.contains('thumbnail-user--role-coach')).toBe(true);
  });
});
