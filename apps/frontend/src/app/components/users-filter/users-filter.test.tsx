import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { UsersFilter } from './users-filter';
import { Location, Role, TrainingLevel, TrainingType, UserSorting } from '@fit-friends/shared';
import { UsersFilters } from '../../types/state-type';
import { SliceName } from '../../constants/common';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const mockFilter: UsersFilters = {
  location: [],
  types: [],
  level: '',
};
const mockSorting = {} as UserSorting;
const mockDirection = null;

const store = mockStore({
    [SliceName.Users]: { users: [] },
  });

const MockUsersFilter = () => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UsersFilter filter={mockFilter} sorting={mockSorting} direction={mockDirection} />
      </Provider>
    </Router>
  );
};

describe('Component: Users filter', () => {
  it('Correct render elements', () => {
    render(<MockUsersFilter />);

    expect(screen.getByText('Локация, станция метро')).toBeInTheDocument();
    const locations = screen.getAllByTestId('checkbox-location-group');
    expect(locations.length).toEqual(Object.values(Location).length);
    locations.forEach((item) => expect(item).toBeInTheDocument());
    expect(screen.getByTestId('all-location-button')).toBeInTheDocument();

    expect(screen.getByText('Специализация')).toBeInTheDocument();
    const types = screen.getAllByTestId('checkbox-type-group');
    expect(types.length).toEqual(Object.values(TrainingType).length);
    types.forEach((item) => expect(item).toBeInTheDocument());
    expect(screen.getByTestId('all-type-button')).toBeInTheDocument();

    expect(screen.getByText('Ваш уровень')).toBeInTheDocument();
    const levels = screen.getAllByTestId('radio-level-group');
    expect(levels.length).toEqual(Object.values(TrainingLevel).length);
    levels.forEach((item) => expect(item).toBeInTheDocument());

    expect(screen.getByText('Сортировка')).toBeInTheDocument();
    const sortings = screen.getAllByTestId('sorting-role-group');
    expect(sortings.length).toEqual(Object.values(Role).length);
    sortings.forEach((item) => expect(item).toBeInTheDocument());
  });

  it('Dispatch if checked location', () => {
    render(<MockUsersFilter />);

    const locations = screen.getAllByTestId('checkbox-location-group');
    locations.forEach((item) => {
        fireEvent.click(item);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        mockDispatch.mockReset();
    });
  });

  it('Dispatch if click show all locations', () => {
    render(<MockUsersFilter />);

    fireEvent.click(screen.getByTestId('all-location-button'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockReset();
  });

  it('Dispatch if checked type', () => {
    render(<MockUsersFilter />);

    const types = screen.getAllByTestId('checkbox-type-group');
    types.forEach((item) => {
        fireEvent.click(item);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        mockDispatch.mockReset();
    });
  });

  it('Dispatch if click show all types', () => {
    render(<MockUsersFilter />);

    fireEvent.click(screen.getByTestId('all-type-button'));
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    mockDispatch.mockReset();
  });

  it('Dispatch if change sorting role', () => {
    render(<MockUsersFilter />);

    const roles = screen.getAllByTestId('sorting-role-group');
    roles.forEach((item) => {
        fireEvent.click(item);
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        mockDispatch.mockReset();
    });
  });
});
