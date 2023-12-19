import { CoachType, Role } from '@fit-friends/shared';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { TrainingUserInfo } from './training-user-info';
import { render, screen } from '@testing-library/react';
import { makeFakeUser } from '../../../utils/mock-data';
import { DEFAULT_AVATAR } from '../../../constants/common';

const history = createMemoryHistory();

const MockTrainingUserInfo = ({ user }: { user: CoachType }) => {
  return (
    <Router location={history.location} navigator={history}>
      <TrainingUserInfo coach={user} />
    </Router>
  );
};

describe('Component', () => {
  it('Correct render component', () => {
    const fakeUser = makeFakeUser(Role.Coach);
    render(<MockTrainingUserInfo user={fakeUser} />);

    expect(screen.getByTestId('coach-avatar')).toHaveAttribute('src', fakeUser.avatar);
    expect(screen.getByText('Тренер')).toBeInTheDocument();
    expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
  });

  it('Show default avatar', () => {
    const fakeUser = {...makeFakeUser(Role.Coach), avatar: ''};
    render(<MockTrainingUserInfo user={fakeUser} />);

    expect(screen.getByTestId('coach-avatar')).toHaveAttribute('src', DEFAULT_AVATAR);
  });
});
