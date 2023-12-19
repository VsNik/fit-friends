import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { CertificatesPopup } from './certificates-popup';
import userEvent from '@testing-library/user-event';

const MOCK_TITLE = 'some-title';

const certificates = [
  '/assets/img/content/certificates/certificate-1.jpg',
  '/assets/img/content/certificates/certificate-2.jpg',
];

const history = createMemoryHistory();
const mockOnClose = jest.fn();

const MockCertificatesPopup = ({ title }: { title: string }) => {
  return (
    <Router location={history.location} navigator={history}>
      <CertificatesPopup title={title} certificates={certificates} onClose={mockOnClose} />
    </Router>
  );
};

describe('Component: Certificate popup', () => {
  it('Correct render', () => {
    render(<MockCertificatesPopup title={MOCK_TITLE} />);

    expect(screen.getByText(MOCK_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId('close-popup-button')).toBeInTheDocument();
    expect(screen.getByTestId('prev-slide')).toBeInTheDocument();
    expect(screen.getByTestId('next-slide')).toBeInTheDocument();

    const slides = screen.getAllByTestId('certificate-popup-frame');
    expect(slides.length).toEqual(certificates.length);
    for(const slide of slides) {
        expect(slide).toBeInTheDocument();
    }
  });

  it('Disabled prev button, if first slide', () => {
    render(<MockCertificatesPopup title={MOCK_TITLE} />);

    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Disabled next button, if last slide', async () => {
    render(<MockCertificatesPopup title={MOCK_TITLE} />);

    await userEvent.click(screen.getByTestId('next-slide'));
    expect(screen.getByTestId('prev-slide')).not.toBeDisabled();
    expect(screen.getByTestId('next-slide')).toBeDisabled();

    await userEvent.click(screen.getByTestId('prev-slide'));
    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Disabled next button, if last slide', async () => {
    render(<MockCertificatesPopup title={MOCK_TITLE} />);

    await userEvent.click(screen.getByTestId('close-popup-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  })
});
