import { createMemoryHistory } from 'history';
import { UserCalories } from './user-calories';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { SliceName } from '../../../constants/common';
import { Role } from '@fit-friends/shared';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const MOCK_CALORY = 1000;

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: user-calories', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User },
      [SliceName.User]: {},
      [SliceName.Notifications]: {},
    });

    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <UserCalories calories={MOCK_CALORY} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('calory-input-element')).toBeInTheDocument();
    expect(screen.getByTestId('summ-calory-input-element')).toBeInTheDocument();

    expect(screen.getByDisplayValue(MOCK_CALORY)).toBeInTheDocument();
    expect(screen.getByDisplayValue(MOCK_CALORY * 7)).toBeInTheDocument();
  });
});