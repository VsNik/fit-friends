import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Location } from '@fit-friends/shared';
import { render, screen } from '@testing-library/react';
import { MapPopup } from './map-popup';
import { getUserLocation } from '../../../utils/helpers';
import userEvent from '@testing-library/user-event';

const MOCK_TITLE = 'some-title';

const history = createMemoryHistory();
const mockOnClose = jest.fn();

const MockMapPopup = ({ location }: { location: Location }) => {
  return (
    <Router location={history.location} navigator={history}>
      <MapPopup location={location} title={MOCK_TITLE} onClose={mockOnClose} />
    </Router>
  );
};

describe('Component: Map popup', () => {
  it('Correct render', () => {
    const mockLocation = Location.Sportivnaya;
    render(<MockMapPopup location={mockLocation} />);

    expect(screen.getByText(MOCK_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId('close-popup-button')).toBeInTheDocument();
    expect(screen.getByText(`м. ${getUserLocation(mockLocation).title}`)).toBeInTheDocument();

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  it('Click close button', async () => {
    const mockLocation = Location.Sportivnaya;
    render(<MockMapPopup location={mockLocation} />);

    await userEvent.click(screen.getByTestId('close-popup-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  })
});
