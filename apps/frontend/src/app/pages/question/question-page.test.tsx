import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Role } from '@fit-friends/shared';
import { QuestionPage } from './question-page';
import { SliceName } from '../../constants/common';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

const MockQuestionPage = ({ store }: { store: MockStore }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <QuestionPage />
      </Provider>
    </Router>
  );
};

describe('Component: Question page', () => {
  it('Render user questions if auth role User', () => {
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
    });

    render(<MockQuestionPage store={store} />);
    expect(screen.getByTestId('user-question-form')).toBeInTheDocument();
  });

  it('Render coach questions if auth role Coach', () => {
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.Coach },
    });

    render(<MockQuestionPage store={store} />);
    expect(screen.getByTestId('coach-question-form')).toBeInTheDocument();
  });
});
