import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { SliceName } from '../../constants/common';
import { Provider } from 'react-redux';
import {SignupPage} from './signup-page';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Auth]: {},
  [SliceName.Notifications]: {},
});

const MockSignupPage = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <SignupPage />
      </Provider>
    </Router>
  );
};

it('Render Login page', () => {
  render(<MockSignupPage />);

  expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
  expect(screen.getByTestId('signup-form')).toBeInTheDocument();
});