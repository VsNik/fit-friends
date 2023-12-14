import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import userEvent from '@testing-library/user-event';
import { TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { getDurationName, getLevelName, getTrainingName } from '../../../utils/helpers';
import { QuestionUserForm } from './question-user-form';
import { UserError } from '@fit-friends/libs/validation';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Auth]: {},
});

const MockQuestionUserForm = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <QuestionUserForm />
      </Provider>
    </Router>
  );
};

describe('Component: Question user form', () => {
  it('Render form elements', () => {
    render(<MockQuestionUserForm />);

    expect(screen.getByText('Ваша специализация (тип) тренировок')).toBeInTheDocument();
    const specializations = screen.getAllByTestId('checkbox-specialization');
    expect(specializations.length).toEqual(Object.values(TrainingType).length);
    Object.values(TrainingType).forEach((item) => {
        expect(screen.getByText(getTrainingName(item))).toBeInTheDocument();
    });

    expect(screen.getByText('Сколько времени вы готовы уделять на тренировку в день')).toBeInTheDocument();
    expect(screen.getByText(getDurationName(TrainingDuration.Low))).toBeInTheDocument();
    expect(screen.getByText(getDurationName(TrainingDuration.Normal))).toBeInTheDocument();
    expect(screen.getByText(getDurationName(TrainingDuration.Hi))).toBeInTheDocument();
    expect(screen.getByText(getDurationName(TrainingDuration.Extra))).toBeInTheDocument();
    const radioDurations = screen.getAllByTestId('radio-duration-group');
    for(const el of radioDurations) {
        expect(el).toBeInTheDocument();
    }

    expect(screen.getByText('Ваш уровень')).toBeInTheDocument();
    expect(screen.getByText(getLevelName(TrainingLevel.Novice))).toBeInTheDocument();
    expect(screen.getByText(getLevelName(TrainingLevel.Amateur))).toBeInTheDocument();
    expect(screen.getByText(getLevelName(TrainingLevel.Professional))).toBeInTheDocument();
    const radioLevels = screen.getAllByTestId('radio-level-group');
    for(const el of radioLevels) {
        expect(el).toBeInTheDocument();
    }

    expect(screen.getByText('Сколько калорий хотите сбросить')).toBeInTheDocument();
    expect(screen.getByTestId('input-lose-calory')).toBeInTheDocument();

    expect(screen.getByText('Сколько калорий тратить в день')).toBeInTheDocument();
    expect(screen.getByTestId('input-burn-calory')).toBeInTheDocument();

    expect(screen.getByText('Продолжить')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit-element')).toBeInTheDocument();
  });

  it('show errors', async () => {
    render(<MockQuestionUserForm />);

    await userEvent.click(screen.getByTestId('button-submit-element'));

    expect(screen.getByText(UserError.LoseCaloryRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.BurnCaloryRequired)).toBeInTheDocument();
  });
});
