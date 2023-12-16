import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './modal';

const history = createMemoryHistory();
const mockOnClose = jest.fn();

const MockChildren = () => <title data-testid="mock-children">Mock Children</title>;

const MockModal = ({ isOpen, dataTestId }: { isOpen: boolean; dataTestId?: string }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Modal isOpen={isOpen} dataTestId={dataTestId} onClose={mockOnClose}>
        <MockChildren />
      </Modal>
    </Router>
  );
};

describe('Component: Modal', () => {
  it('Unmount children component if closed modal', () => {
    render(<MockModal isOpen={false} dataTestId="modal-component" />);

    expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock Children')).not.toBeInTheDocument();
  });

  it('Mount children component and add "is-active" open, if closed modal', () => {
    render(<MockModal isOpen={true} dataTestId="modal-component" />);

    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
    expect(screen.getByText('Mock Children')).toBeInTheDocument();

    expect(screen.getByTestId('modal-component').classList.contains('is-active')).toBe(true);
  });

  it('Lock scroll, if open modal', () => {
    render(<MockModal isOpen={true} dataTestId="modal-component" />);

    const isScrolLock = document.querySelector('body')?.classList.contains('scroll-lock');
    expect(isScrolLock).toBe(true);
  });

  it('Called "onClose", if keydown Escape', () => {
    render(<MockModal isOpen={true} dataTestId="modal-component" />);

    fireEvent.keyDown(screen.getByTestId('modal-component'), {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
      expect(mockOnClose).toBeCalled();
  });
});
