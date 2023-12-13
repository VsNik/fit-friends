import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName, locationsList } from '../../../constants/common';
import userEvent from '@testing-library/user-event';
import { SignupForm } from './signup-form';
import { UserError } from '@fit-friends/libs/validation';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Auth]: {},
});

const MockSignupForm = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <SignupForm />
      </Provider>
    </Router>
  );
};

describe('Component: Signup form', () => {
  it('Render form elements', () => {
    render(<MockSignupForm />);

    expect(screen.getByText(/Загрузите фото профиля/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-avatar-element')).toBeInTheDocument();

    expect(screen.getByText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-name-element')).toBeInTheDocument();

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-email-element')).toBeInTheDocument();

    expect(screen.getByText(/Дата рождения/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-birthday-element')).toBeInTheDocument();

    expect(screen.getByText(/Ваша локация/i)).toBeInTheDocument();
    expect(screen.getByTestId('select-location-element')).toBeInTheDocument();

    expect(screen.getByText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-password-element')).toBeInTheDocument();

    expect(screen.getByText('Пол')).toBeInTheDocument();
    expect(screen.getByText(/Мужской/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-gender-male')).toBeInTheDocument();
    expect(screen.getByText(/Женский/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-gender-female')).toBeInTheDocument();
    expect(screen.getByText(/Неважно/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-gender-any')).toBeInTheDocument();

    expect(screen.getByText('Выберите роль')).toBeInTheDocument();
    expect(screen.getByText('Я хочу тренировать')).toBeInTheDocument();
    expect(screen.getByTestId('radio-coach-role')).toBeInTheDocument();
    expect(screen.getByText('Я хочу тренироваться')).toBeInTheDocument();
    expect(screen.getByTestId('radio-user-role')).toBeInTheDocument();

    expect(screen.getByText(/Я соглашаюсь/i)).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-agreement')).toBeInTheDocument();

    expect(screen.getByText(/Продолжить/i)).toBeInTheDocument();
    expect(screen.getByTestId('button-submit-element')).toBeInTheDocument();
  });

  it('input fields test', async () => {
    render(<MockSignupForm />);

    await userEvent.type(screen.getByTestId('input-name-element'), 'some-name');
    expect(screen.getByDisplayValue('some-name')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-email-element'), 'some-email');
    expect(screen.getByDisplayValue('some-email')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('select-location-element'));
    await userEvent.click(screen.getByText(locationsList[0].label));
    expect(screen.getByTestId('select-location-element').previousElementSibling?.textContent).toBe(locationsList[0].label);

    await userEvent.type(screen.getByTestId('input-password-element'), 'password');
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });

  it('input fields test', async () => {
    render(<MockSignupForm />);

    await userEvent.click(screen.getByTestId('checkbox-agreement'));
    await userEvent.click(screen.getByTestId('button-submit-element'));

    expect(screen.getByText(UserError.NameRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.EmailRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.LocationRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.PasswordRequired)).toBeInTheDocument();
  });
});
