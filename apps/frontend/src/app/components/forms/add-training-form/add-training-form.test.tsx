import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName, durationsList, levelsList, trainingsList } from '../../../constants/common';
import { AddTrainingForm } from './add-training-form';
import userEvent from '@testing-library/user-event';
import { TrainingError, UserError } from '@fit-friends/libs/validation';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Training]: {},
});

const MockAddTrainingForm = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <AddTrainingForm />
      </Provider>
    </Router>
  );
};

describe('Component: Add training form', () => {
  it('Render form elements', () => {
    render(<MockAddTrainingForm />);

    expect(screen.getByText(/Название тренировки/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-title-element')).toBeInTheDocument();

    expect(screen.getByText(/Характеристики тренировки/i)).toBeInTheDocument();

    expect(screen.getByText(/Выберите тип тренировки/i)).toBeInTheDocument();
    expect(screen.getByTestId('select-type-element')).toBeInTheDocument();

    expect(screen.getByText(/Сколько калорий потратим/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-calory-element')).toBeInTheDocument();

    expect(screen.getByText(/Сколько времени потратим/i)).toBeInTheDocument();
    expect(screen.getByTestId('select-duration-element')).toBeInTheDocument();

    expect(screen.getByText(/Стоимость тренировки/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-price-element')).toBeInTheDocument();

    expect(screen.getByText(/Выберите уровень тренировки/i)).toBeInTheDocument();
    expect(screen.getByTestId('select-level-element')).toBeInTheDocument();

    expect(screen.getByText(/Кому подойдет тренировка/i)).toBeInTheDocument();
    expect(screen.getByText(/Мужской/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-gender-male')).toBeInTheDocument();
    expect(screen.getByText(/Женский/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-gender-female')).toBeInTheDocument();
    expect(screen.getByText(/Неважно/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-gender-any')).toBeInTheDocument();

    expect(screen.getByText(/Описание тренировки/i)).toBeInTheDocument();
    expect(screen.getByTestId('textarea-desc-element')).toBeInTheDocument();

    expect(screen.getByText(/Загрузите видео-тренировку/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-video-element')).toBeInTheDocument();

    expect(screen.getByText(/Опубликовать/i)).toBeInTheDocument();
    expect(screen.getByTestId('button-submit-element')).toBeInTheDocument();
  });

  it('input fields test', async () => {
    render(<MockAddTrainingForm />);

    await userEvent.type(screen.getByTestId('input-title-element'), 'some-name');
    expect(screen.getByDisplayValue('some-name')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('select-type-element'));
    await userEvent.click(screen.getByText(trainingsList[0].label));
    expect(screen.getByTestId('select-type-element').previousElementSibling?.textContent).toBe(trainingsList[0].label);

    await userEvent.type(screen.getByTestId('input-calory-element'), '1000');
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('select-duration-element'));
    await userEvent.click(screen.getByText(durationsList[0].label));
    expect(screen.getByTestId('select-duration-element').previousElementSibling?.textContent).toBe(durationsList[0].label);

    await userEvent.type(screen.getByTestId('input-price-element'), '3000');
    expect(screen.getByDisplayValue('3000')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('select-level-element'));
    await userEvent.click(screen.getByText(levelsList[0].label));
    expect(screen.getByTestId('select-level-element').previousElementSibling?.textContent).toBe(levelsList[0].label);

    await userEvent.type(screen.getByTestId('textarea-desc-element'), 'some-description');
    expect(screen.getByDisplayValue('some-description')).toBeInTheDocument();
  });

  it('show errors', async () => {
    render(<MockAddTrainingForm />);

    await userEvent.click(screen.getByTestId('button-submit-element'));

    expect(screen.getByText(TrainingError.TitleRequired)).toBeInTheDocument();
    expect(screen.getByText(TrainingError.TypeRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.LoseCaloryRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.DurationRequired)).toBeInTheDocument();
    expect(screen.getByText(TrainingError.PriceRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.LevelRequired)).toBeInTheDocument();
    expect(screen.getByText(TrainingError.DescRequired)).toBeInTheDocument();
    expect(screen.getByText(TrainingError.VideoRequired)).toBeInTheDocument();
  });
});

