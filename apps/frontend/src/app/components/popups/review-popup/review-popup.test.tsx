import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { ReviewPopup } from './review-popup';
import userEvent from '@testing-library/user-event';
import { MockData } from '../../../utils/mock-data';
import { SliceName } from '../../../constants/common';
import { OtherError } from '@fit-friends/libs/validation';

const MOCK_TITLE = 'some-title';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const mockOnClose = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const store = mockStore({[SliceName.Reviews]: {}});

const MockReviewPopup = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ReviewPopup trainingId={MockData.Id} title={MOCK_TITLE} onClose={mockOnClose} />
      </Provider>
    </Router>
  );
};

describe('Component: Review popup', () => {
  it('Correct render component', async () => {
    render(<MockReviewPopup />);

    expect(screen.getByText(MOCK_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId('close-popup-button')).toBeInTheDocument();

    expect(screen.getByText('Оцените тренировку')).toBeInTheDocument();
    expect(screen.getByTestId('check-rating-component')).toBeInTheDocument();

    expect(screen.getByText('Поделитесь своими впечатлениями о тренировке')).toBeInTheDocument();
    await userEvent.type(screen.getByTestId('review-textarea'), 'some-text');
    expect(screen.getByDisplayValue('some-text')).toBeInTheDocument();

    expect(screen.getByTestId('submit-button-element')).toBeInTheDocument();
  });

  it('Show validate error', async () => {
    render(<MockReviewPopup />);

    await userEvent.click(screen.getByTestId('submit-button-element'));
    expect(screen.getByText(OtherError.ReviewRequired)).toBeInTheDocument();
  });

  it('Click close button', async () => {
    render(<MockReviewPopup />);

    await userEvent.click(screen.getByTestId('close-popup-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  })
});
