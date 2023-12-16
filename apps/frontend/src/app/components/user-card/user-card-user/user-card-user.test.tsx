import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserCardUser } from './user-card-user';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { IUser, Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';
import { makeFakeUser } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { getLevelName, getUserLocation } from '../../../utils/helpers';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockOpenMap = jest.fn();

const MockUserCardUser = ({ store, user }: { store: MockStore; user: IUser }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserCardUser user={user} onOpenMap={mockOpenMap} />
      </Provider>
    </Router>
  );
};

describe('Component: User card', () => {
  it('Correct render component', () => {
    const fakeUser = makeFakeUser(Role.User);

    const store = mockStore({
      [SliceName.Auth]: {  },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardUser store={store} user={fakeUser} />);

    expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
    expect(screen.getByText(getUserLocation(fakeUser.location).title)).toBeInTheDocument();
    expect(screen.getByTestId('open-map-popub-button')).toBeInTheDocument();
    expect(screen.getByTestId('user-description').textContent).toBe(fakeUser.bio);

    const trainingTypes = screen.getAllByTestId('training-type');
    expect(trainingTypes.length).toEqual(fakeUser.trainingType?.length);
    for (const training of trainingTypes) {
        expect(training).toBeInTheDocument();
    }

    expect(screen.getByTestId('training-level').textContent).toBe(`#${getLevelName(fakeUser.trainingLevel!)}`)
    expect(screen.getByTestId('friend-button-element')).toBeInTheDocument();

    const userImages = screen.getAllByTestId('user-galery-bg');
    expect(userImages.length).toEqual(fakeUser.bgImage?.length);
    for (const image of userImages) {
      expect(image).toBeInTheDocument();
    }
  });
});
