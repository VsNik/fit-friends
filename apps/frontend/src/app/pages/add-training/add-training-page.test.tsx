import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { SliceName } from '../../constants/common';
import { Provider } from 'react-redux';
import { AddTrainingPage } from './add-training-page';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const store = mockStore({
  [SliceName.Training]: {},
  [SliceName.Notifications]: {},
});

const MockAddTrainingPage = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <AddTrainingPage />
      </Provider>
    </Router>
  );
};

it('Render add training page', () => {
  render(<MockAddTrainingPage />);

  expect(screen.getByText(/Создание тренировки/i)).toBeInTheDocument();
  expect(screen.getByTestId('add-training-form')).toBeInTheDocument();
});
