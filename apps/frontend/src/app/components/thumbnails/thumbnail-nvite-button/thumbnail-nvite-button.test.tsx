import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { IUser } from '@fit-friends/shared';
import { ThumbnailInviteButton } from './thumbnail-nvite-button';
import { makeFakeUser } from '../../../utils/mock-data';

const history = createMemoryHistory();
const onClick = jest.fn();

const MockThumbnailInviteButton = ({ user, disabled = false }: { user: IUser; disabled?: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <ThumbnailInviteButton user={user} onClick={onClick} disabled={disabled} />
    </Router>
  );
};

describe('Component: Thumbnail Invite button', () => {
  it('No disabled if user ready to training', () => {
    const fakeUser = { ...makeFakeUser(), ready: true };
    render(<MockThumbnailInviteButton user={fakeUser} />);
    expect(screen.getByTestId('friend-invite-button')).not.toBeDisabled();
    expect(screen.getByTestId('friend-invite-button').classList.contains('is-disabled')).toBe(false);
  });

  it('Disabled if user not ready to training', () => {
    const fakeUser = { ...makeFakeUser(), ready: false };
    render(<MockThumbnailInviteButton user={fakeUser} />);
    expect(screen.getByTestId('friend-invite-button')).toBeDisabled();
    expect(screen.getByTestId('friend-invite-button').classList.contains('is-disabled')).toBe(true);
  });

  it('Disabled if parameter "disabled" is passed', () => {
    const fakeUser = { ...makeFakeUser(), ready: true };
    render(<MockThumbnailInviteButton user={fakeUser} disabled />);
    expect(screen.getByTestId('friend-invite-button')).toBeDisabled();
    expect(screen.getByTestId('friend-invite-button').classList.contains('is-disabled')).toBe(true);
  });
});
