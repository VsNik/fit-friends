import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import userEvent from '@testing-library/user-event';
import { CertificateError, UserError } from '@fit-friends/libs/validation';
import { QuestionCoachForm } from './question-coach-form';
import { TrainingType } from '@fit-friends/shared';
import { getTrainingName } from '../../../utils/helpers';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Auth]: {},
});

const MockQuestionCoachForm = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <QuestionCoachForm />
      </Provider>
    </Router>
  );
};

describe('Component: Question coach form', () => {
  it('Render form elements', () => {
    render(<MockQuestionCoachForm />);

    expect(screen.getByText('Ваша специализация (тип) тренировок')).toBeInTheDocument();
    const specializations = screen.getAllByTestId('checkbox-specialization');
    expect(specializations.length).toEqual(Object.values(TrainingType).length);
    Object.values(TrainingType).forEach((item) => {
      expect(screen.getByText(getTrainingName(item))).toBeInTheDocument();
    });

    expect(screen.getByText(/Ваш уровень/i)).toBeInTheDocument();
    expect(screen.getByText(/Новичок/i)).toBeInTheDocument();
    expect(screen.getByText(/Любитель/i)).toBeInTheDocument();
    expect(screen.getByText(/Профессионал/i)).toBeInTheDocument();
    const radioLevels = screen.getAllByTestId('radio-level-group');
    for (const el of radioLevels) {
      expect(el).toBeInTheDocument();
    }

    expect(screen.getByText('Ваши дипломы и сертификаты')).toBeInTheDocument();
    expect(screen.getByTestId('input-certificate-element')).toBeInTheDocument();

    expect(screen.getByText('Расскажите о своём опыте, который мы сможем проверить')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-desc-element')).toBeInTheDocument();

    expect(screen.getByText('Хочу дополнительно индивидуально тренировать')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-ready-element')).toBeInTheDocument();

    expect(screen.getByText('Продолжить')).toBeInTheDocument();
    expect(screen.getByTestId('button-submit-element')).toBeInTheDocument();
  });

  it('show errors', async () => {
    render(<MockQuestionCoachForm />);

    await userEvent.click(screen.getByTestId('button-submit-element'));

    expect(screen.getByText(CertificateError.Required)).toBeInTheDocument();
    expect(screen.getByText(UserError.MeritsRequired)).toBeInTheDocument();
  });
});
