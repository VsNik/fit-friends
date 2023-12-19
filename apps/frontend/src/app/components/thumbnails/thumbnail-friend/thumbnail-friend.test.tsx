import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen, within } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IInvitation, IUser, InviteStatus, Role } from '@fit-friends/shared';
import { ThumbnailFriend } from './thumbnail-friend';
import { MockData, makeFakeInvitation, makeFakeUser } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { getUserLocation } from '../../../utils/helpers';

const DEFAULT_AVATAR = '/assets/img/default_avatar.png';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockThumbnailFriend = (props: { store: MockStore; authRole: Role; user: IUser, invitations?: IInvitation[] }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={props.store}>
        <ThumbnailFriend user={props.user} authRole={props.authRole} authId={MockData.Id} invitations={props.invitations} />
      </Provider>
    </Router>
  );
};

describe('Component: ThumbnailFriend', () => {
  it('Corect render: user data', () => {
    const fakeUser = makeFakeUser(Role.User);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
    });

    render(<MockThumbnailFriend store={store} user={fakeUser} authRole={Role.User} />);

    expect(screen.getByTestId('thumbnail-friend-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('thumbnail-friend-avatar')).toHaveAttribute('src', fakeUser.avatar);

    const types = screen.getByTestId('thumbnail-friend-hashtag');
    fakeUser.trainingType?.forEach((type) => {
      expect(within(types).getByText(`#${type}`)).toBeInTheDocument();
    })

    expect(screen.getByTestId('thumbnail-friend-location').textContent).toEqual(getUserLocation(fakeUser.location).title);
    expect(screen.getByTestId('thumbnail-friend-name').textContent).toEqual(fakeUser.name);
  });

  it('Corect render: ready user to trainings, and active invite icon', () => {
    const fakeUser = makeFakeUser(Role.User);
    const userReady = Object.assign(fakeUser, fakeUser.ready = true);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: userReady },
      [SliceName.Notifications]: {},
    });

    render(<MockThumbnailFriend store={store} user={userReady} authRole={Role.User} />);

    expect(screen.getByText('Готов к тренировке')).toBeInTheDocument();
    expect(screen.getByTestId('friend-invite-button')).not.toBeDisabled();
  });

  it('Corect render: not ready user to trainings', () => {
    const fakeUser = makeFakeUser(Role.User);
    const userNotReady = Object.assign(fakeUser, fakeUser.ready = false);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: userNotReady },
      [SliceName.Notifications]: {},
    });

    render(<MockThumbnailFriend store={store} user={userNotReady} authRole={Role.User} />);

    expect(screen.getByText('Не готов к тренировке')).toBeInTheDocument();
    expect(screen.getByTestId('friend-invite-button')).toBeDisabled();
  })

  it('Corect render: ready coach to personal trainings, and dark background class', () => {
    const fakeUser = makeFakeUser(Role.Coach);
    const coachReady = Object.assign(fakeUser, fakeUser.personalTraining = true);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: coachReady },
      [SliceName.Notifications]: {},
    });

    render(<MockThumbnailFriend store={store} user={coachReady} authRole={Role.User} />);

    expect(screen.getByText('Готов тренировать')).toBeInTheDocument();
    expect(screen.getByTestId('thumbnail-friend-wrapper')).toHaveClass('thumbnail-friend__info--theme-dark')
  })

  it('Corect render: not ready coach to personal trainings, and dark background class', () => {
    const fakeUser = makeFakeUser(Role.Coach);
    const coachReady = Object.assign(fakeUser, fakeUser.personalTraining = false);

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: coachReady },
      [SliceName.Notifications]: {},
    });

    render(<MockThumbnailFriend store={store} user={coachReady} authRole={Role.User} />);

    expect(screen.getByText('Не готов тренировать')).toBeInTheDocument();
    expect(screen.getByTestId('thumbnail-friend-wrapper')).toHaveClass('thumbnail-friend__info--theme-dark')
  })

  it('Show default avatar if no user avatar', () => {
    const fakeUser = makeFakeUser(Role.User);
    const noAvatarUser = Object.assign(fakeUser, fakeUser.avatar = '');

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: { user: noAvatarUser },
      [SliceName.Notifications]: {},
      [SliceName.Invites]: {}
    });

    render(<MockThumbnailFriend store={store} user={noAvatarUser} authRole={Role.User} />);

    expect(screen.getByTestId('thumbnail-friend-avatar')).toHaveAttribute('src', DEFAULT_AVATAR);
  })

  it('Show invite control, if invite to training, role user', () => {
    const fakeUser = makeFakeUser(Role.User);
    const mockInvite = makeFakeInvitation;
    const fakeInvite = {...mockInvite, initiatorId: fakeUser.id, toUserId: MockData.Id, status: InviteStatus.Waiting}

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User, authId: MockData.Id },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
      [SliceName.Invites]: {invitations: [fakeInvite]}
    });

    render(<MockThumbnailFriend store={store} user={fakeUser} authRole={Role.User} invitations={[fakeInvite]} />);

    expect(screen.getByTestId('thumbnail-friend-control')).toBeInTheDocument();
    expect(screen.getByText('Запрос на совместную тренировку')).toBeInTheDocument();

    expect(screen.getByText('Принять')).toBeInTheDocument();
    expect(screen.getByText('Отклонить')).toBeInTheDocument();
  })

  it('Show invite control, if invite to training, role coach', () => {
    const fakeUser = makeFakeUser(Role.Coach);
    const mockInvite = makeFakeInvitation;
    const fakeInvite = {...mockInvite, initiatorId: fakeUser.id, toUserId: MockData.Id, status: InviteStatus.Waiting}

    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach, authId: MockData.Id },
      [SliceName.User]: { user: fakeUser },
      [SliceName.Notifications]: {},
      [SliceName.Invites]: {invitations: [fakeInvite]}
    });

    render(<MockThumbnailFriend store={store} user={fakeUser} authRole={Role.Coach} invitations={[fakeInvite]} />);

    expect(screen.getByTestId('thumbnail-friend-control')).toBeInTheDocument();
    expect(screen.getByText('Запрос на персональную тренировку')).toBeInTheDocument();
    expect(screen.getByText('Принять')).toBeInTheDocument();
    expect(screen.getByText('Отклонить')).toBeInTheDocument();
  })
});
