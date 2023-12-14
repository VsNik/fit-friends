import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { IUser, Role } from '@fit-friends/shared';
import { ThumbnailReadyStatus } from './thumbnail-ready-status';
import { makeFakeUser } from '../../../utils/mock-data';

const history = createMemoryHistory();

const MockThumbnailReadyStatus = ({ user }: { user: IUser }) => {
  return (
    <Router location={history.location} navigator={history}>
      <ThumbnailReadyStatus user={user} />
    </Router>
  );
};

describe('Component: Thumbnail total info', () => {
  it('Role user, and ready to training', () => {
    const fakeUser = { ...makeFakeUser(Role.User), ready: true };
    render(<MockThumbnailReadyStatus user={fakeUser} />);
    expect(screen.getByText('Готов к тренировке')).toBeInTheDocument();
  });

  it('Role user, and not ready to training', () => {
    const fakeUser = { ...makeFakeUser(Role.User), ready: false };
    render(<MockThumbnailReadyStatus user={fakeUser} />);
    expect(screen.getByText('Не готов к тренировке')).toBeInTheDocument();
  });

  it('Role coach, and ready to training', () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: true };
    render(<MockThumbnailReadyStatus user={fakeUser} />);
    expect(screen.getByText('Готов тренировать')).toBeInTheDocument();
  });

  it('Role coach, and not ready to training', () => {
    const fakeUser = { ...makeFakeUser(Role.Coach), personalTraining: false };
    render(<MockThumbnailReadyStatus user={fakeUser} />);
    expect(screen.getByText('Не готов тренировать')).toBeInTheDocument();
  });
});
