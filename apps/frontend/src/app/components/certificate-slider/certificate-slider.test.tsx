import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { CertificateSlider } from './certificate-slider';
import { SliceName } from '../../constants/common';
import { makeFakeUser } from '../../utils/mock-data';
import { Role } from '@fit-friends/shared';
import userEvent from '@testing-library/user-event';

const certificates = [
    '/assets/img/content/certificates/certificate-1.jpg',
    '/assets/img/content/certificates/certificate-2.jpg',
    '/assets/img/content/certificates/certificate-3.jpg',
    '/assets/img/content/certificates/certificate-4.jpg',
]

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const fakeUser = {...makeFakeUser(Role.Coach), certificate: certificates};

const store = mockStore({
  [SliceName.Auth]: {},
  [SliceName.User]: { user: fakeUser },
});

const MockCertificateSlider = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <CertificateSlider user={fakeUser} />
      </Provider>
    </Router>
  );
};

describe('Component: Certificate slider', () => {
  it('Correct render', () => {
    render(<MockCertificateSlider />);

    expect(screen.getByText('Дипломы и сертификаты')).toBeInTheDocument();
    expect(screen.getByTestId('add-certificate-form')).toBeInTheDocument();
    expect(screen.getByTestId('prev-slide')).toBeInTheDocument();
    expect(screen.getByTestId('next-slide')).toBeInTheDocument();

    const certificates = screen.getAllByTestId('certificate-frame');
    expect(certificates.length).toEqual(fakeUser.certificate?.length);
    for(const certificate of certificates) {
        expect(certificate).toBeInTheDocument();
    }
  });

  it('Disabled prev button, if first slide', () => {
    render(<MockCertificateSlider />);

    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });

  it('Disabled next button, if last slide', async () => {
    render(<MockCertificateSlider />);

    await userEvent.click(screen.getByTestId('next-slide'));
    expect(screen.getByTestId('prev-slide')).not.toBeDisabled();
    expect(screen.getByTestId('next-slide')).toBeDisabled();

    await userEvent.click(screen.getByTestId('prev-slide'));
    expect(screen.getByTestId('prev-slide')).toBeDisabled();
    expect(screen.getByTestId('next-slide')).not.toBeDisabled();
  });
});
