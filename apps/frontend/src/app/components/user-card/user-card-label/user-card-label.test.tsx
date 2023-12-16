import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCardLabel } from './user-card-label';

const MOCK_POSITION = 'some position';

const history = createMemoryHistory();
const mockOpenMap = jest.fn();

const MockUserCardLabel = ({ position }: { position: string }) => {
  return (
    <Router location={history.location} navigator={history}>
      <UserCardLabel position={position} onOpenMap={mockOpenMap} />
    </Router>
  );
};

describe('Component: User card label', () => {
  it('Show position text', () => {
    render(<MockUserCardLabel position={MOCK_POSITION} />);
    expect(screen.getByText(MOCK_POSITION)).toBeInTheDocument();
  });

  it('Click component', async () => {
    render(<MockUserCardLabel position={MOCK_POSITION} />);
    await userEvent.click(screen.getByTestId('open-map-popub-button'));
    expect(mockOpenMap).toHaveBeenCalledTimes(1);
  });
});
