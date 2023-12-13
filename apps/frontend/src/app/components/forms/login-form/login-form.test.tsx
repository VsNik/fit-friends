import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import { LoginForm } from './login-form';
import userEvent from '@testing-library/user-event';
import { UserError } from '@fit-friends/libs/validation';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Auth]: {},
});

const MockLoginForm = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <LoginForm />
      </Provider>
    </Router>
  );
};

describe('Component: Login form', () => {
  it('Render form elements', () => {
    render(<MockLoginForm />);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-email-element')).toBeInTheDocument();

    expect(screen.getByText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByTestId('input-password-element')).toBeInTheDocument();

    expect(screen.getByText(/Продолжить/i)).toBeInTheDocument();
    expect(screen.getByTestId('button-submit-element')).toBeInTheDocument();
  });

  it('input fields test', async () => {
    render(<MockLoginForm />);

    await userEvent.type(screen.getByTestId('input-email-element'), 'some-email@app.test');
    expect(screen.getByDisplayValue('some-email@app.test')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-password-element'), 'some-password');
    expect(screen.getByDisplayValue('some-password')).toBeInTheDocument();
  });

  it('show errors', async () => {
    render(<MockLoginForm />);

    await userEvent.click(screen.getByTestId('button-submit-element'));

    expect(screen.getByText(UserError.EmailRequired)).toBeInTheDocument();
    expect(screen.getByText(UserError.PasswordRequired)).toBeInTheDocument();
  });
});
