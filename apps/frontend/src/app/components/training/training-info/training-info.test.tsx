import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TrainingInfo } from './training-info';
import { ITraining, Role } from '@fit-friends/shared';
import { makeFakeTraining } from '../../../utils/mock-data';
import React from 'react';
import { getDurationName, getGenderName, getTrainingName } from '../../../utils/helpers';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockOnChangeMode = jest.fn();
const mockOnOpenByPopup = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const store = mockStore({});

interface MockTrainingInfoProps {
  training: ITraining;
  role: Role;
  isAuthor: boolean;
  isEditable?: boolean;
  isPositiveBalance?: boolean;
}

const MockTrainingInfo: React.FC<MockTrainingInfoProps> = ({ training, role, isAuthor, isEditable = false, isPositiveBalance = false }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <TrainingInfo
          training={training}
          role={role}
          isAuthor={isAuthor}
          isPositiveBalance={isPositiveBalance}
          isEditable={isEditable}
          isLoading={false}
          onChangeMode={mockOnChangeMode}
          onOpenBuyPopup={mockOnOpenByPopup}
        />
      </Provider>
    </Router>
  );
};

describe('Component: Training info', () => {
  it('Correct render if role user', () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.User} isAuthor={false} />);

    expect(screen.queryByText('Редактировать')).not.toBeInTheDocument();
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();

    expect(screen.getByTestId('training-user-info-component')).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeTraining.title)).toBeInTheDocument();

    if (fakeTraining.description) {
      expect(screen.getByDisplayValue(fakeTraining.description)).toBeInTheDocument();
    }

    expect(screen.getByTestId('training-info-rating-component')).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeTraining.rating)).toBeInTheDocument();

    expect(screen.getByTestId('training-type').textContent).toBe(`#${getTrainingName(fakeTraining.type)}`);
    expect(screen.getByTestId('training-gender').textContent).toBe(`#${getGenderName(fakeTraining.gender)}`);
    expect(screen.getByTestId('training-calories').textContent).toBe(`#${fakeTraining.calories} кал`);
    expect(screen.getByTestId('training-duration').textContent).toBe(`#${getDurationName(fakeTraining.duration)}`);

    expect(screen.getByText('Стоимость')).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeTraining.price)).toBeInTheDocument();

    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByTestId('buy-training-button')).toBeInTheDocument();
    expect(screen.getByTestId('buy-training-button')).not.toBeDisabled();

    expect(screen.queryByText('Сделать скидку 10%')).not.toBeInTheDocument();
    expect(screen.queryByText('Отменить скидку')).not.toBeInTheDocument();
  });

  it('Not editable fields if role user', () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.User} isAuthor={false} />);

    const inputs = screen.getAllByTestId('training-info-input');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });

    expect(screen.getByTestId('training-info-textarea')).toBeDisabled();
    expect(screen.getByTestId('training-info-input-rating')).toBeDisabled();
  });

  it('Disabled "Buy Training" button if is positive balance', () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.User} isAuthor={false} isPositiveBalance />);

    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByTestId('buy-training-button')).toBeInTheDocument();
    expect(screen.getByTestId('buy-training-button')).toBeDisabled();
  });

  it('Click to "Buy Training" button', () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.User} isAuthor={false} />);

    fireEvent.click(screen.getByTestId('buy-training-button'));
    expect(mockOnOpenByPopup).toHaveBeenCalledTimes(1);
    mockOnOpenByPopup.mockReset();
  });

  it('Correct render if role coach', () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.Coach} isAuthor={true} />);

    expect(screen.getByText('Редактировать')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();

    expect(screen.getByTestId('training-user-info-component')).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeTraining.title)).toBeInTheDocument();

    if (fakeTraining.description) {
      expect(screen.getByDisplayValue(fakeTraining.description)).toBeInTheDocument();
    }

    expect(screen.getByTestId('training-info-rating-component')).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeTraining.rating)).toBeInTheDocument();

    expect(screen.getByTestId('training-type').textContent).toBe(`#${getTrainingName(fakeTraining.type)}`);
    expect(screen.getByTestId('training-gender').textContent).toBe(`#${getGenderName(fakeTraining.gender)}`);
    expect(screen.getByTestId('training-calories').textContent).toBe(`#${fakeTraining.calories} кал`);
    expect(screen.getByTestId('training-duration').textContent).toBe(`#${getDurationName(fakeTraining.duration)}`);

    expect(screen.getByText('Стоимость')).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeTraining.price)).toBeInTheDocument();

    expect(screen.queryByText('Купить')).not.toBeInTheDocument();
    expect(screen.queryByTestId('buy-training-button')).not.toBeInTheDocument();

    fakeTraining.isSpecial
        ? expect(screen.getByText('Отменить скидку')).toBeInTheDocument()
        : expect(screen.getByText('Сделать скидку 10%')).toBeInTheDocument();
  });

  it('Not disabled fields, if passed "isEditable" parametr', () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.Coach} isAuthor={true} isEditable />);

    const inputs = screen.getAllByTestId('training-info-input');
    inputs.forEach((input) => {
      expect(input).not.toBeDisabled();
    });

    expect(screen.getByTestId('training-info-textarea')).not.toBeDisabled();
    expect(screen.getByTestId('training-info-input-rating')).not.toBeDisabled();
  });

  it('Click to "Edit" button"', async () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.Coach} isAuthor={true} isEditable />);

    await userEvent.click(screen.getByText('Редактировать'));
    expect(mockOnChangeMode).toHaveBeenCalledTimes(1);
    mockOnChangeMode.mockReset();
  })

  it('Dispatch if click to "Save button"', async () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.Coach} isAuthor={true} isEditable />);

    await userEvent.click(screen.getByText('Сохранить'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockReset();
  })

  it('Hidden "Edit" button if coach is not the author', async () => {
    const fakeTraining = makeFakeTraining();
    render(<MockTrainingInfo training={fakeTraining} role={Role.Coach} isAuthor={false} isEditable />);

    expect(screen.queryByText('Редактировать')).not.toBeInTheDocument();
    expect(screen.queryByText('Сохранить')).not.toBeInTheDocument();
  })
});
