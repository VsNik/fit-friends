import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { SliceName } from '../../constants/common';
import { Provider } from 'react-redux';
import { LoginPage } from './login-page';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Auth]: {},
  [SliceName.Notifications]: {},
});

const MockLoginPage = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <LoginPage />
      </Provider>
    </Router>
  );
};

it('Render Login page', () => {
  render(<MockLoginPage />);

  expect(screen.getByText(/Вход/i)).toBeInTheDocument();
  expect(screen.getByTestId('login-form')).toBeInTheDocument();
});
