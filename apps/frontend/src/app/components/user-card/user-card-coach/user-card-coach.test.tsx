import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UserCardCoach } from './user-card-coach';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { IUser, Role } from '@fit-friends/shared';
import { Provider } from 'react-redux';
import { makeFakeUser } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { getUserLocation } from '../../../utils/helpers';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockOpenMap = jest.fn();
const mockOpenCertificate = jest.fn();

const MockUserCardCoach = ({ store, user }: { store: MockStore; user: IUser }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserCardCoach user={user} onOpenMap={mockOpenMap} onOpenCertificatePopup={mockOpenCertificate} />
      </Provider>
    </Router>
  );
};

describe('Component: User card coach', () => {
  it('Correct render component', () => {
    const fakeUser = makeFakeUser(Role.User);

    const store = mockStore({
      [SliceName.Auth]: {},
      [SliceName.Trainings]: { trainings: [] },
      [SliceName.User]: { user: fakeUser },
    });

    render(<MockUserCardCoach store={store} user={fakeUser} />);

    expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
    expect(screen.getByText(getUserLocation(fakeUser.location).title)).toBeInTheDocument();
    expect(screen.getByTestId('open-map-popub-button')).toBeInTheDocument();
    expect(screen.getByTestId('user-description').textContent).toBe(fakeUser.bio);

    const trainingTypes = screen.getAllByTestId('training-type');
    expect(trainingTypes.length).toEqual(fakeUser.trainingType?.length);
    for (const training of trainingTypes) {
      expect(training).toBeInTheDocument();
    }

    expect(screen.getByTestId('friend-button-element')).toBeInTheDocument();

    const userImages = screen.getAllByTestId('user-galery-bg');
    expect(userImages.length).toEqual(fakeUser.bgImage?.length);
    for (const image of userImages) {
      expect(image).toBeInTheDocument();
    }

    expect(screen.getByTestId('coach-card-trainings-slider')).toBeInTheDocument();
    expect(screen.getByTestId('coach-card-form')).toBeInTheDocument();
  });
});
