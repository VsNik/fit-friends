import { createMemoryHistory } from 'history';
import ResizeObserver from 'resize-observer-polyfill';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Role } from '@fit-friends/shared';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router, generatePath } from 'react-router-dom';
import { App } from './app';
import { SliceName } from './constants/common';
import { RouteName } from './constants/route';
import { MockData, makeFakeTraining, makeFakeUser } from './utils/mock-data';

const INVALID_PATH = '/is-invalid-path';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const mockTraining = makeFakeTraining();

const slices = {
  [SliceName.ForYou]: { trainings: [] },
  [SliceName.Special]: { trainings: [] },
  [SliceName.Popular]: { trainings: [] },
  [SliceName.Users]: { users: [], filter: { location: [] } },
  [SliceName.Trainings]: { trainings: [], filter: {} },
  [SliceName.Training]: { training: mockTraining },
  [SliceName.Notifications]: {},
  [SliceName.Invites]: {},
  [SliceName.Balance]: {},
  [SliceName.Balances]: { balances: [] },
  [SliceName.Reviews]: { reviews: [] },
  [SliceName.Order]: {},
};

const MocApp = ({ store }: { store: MockStore }) => {
  return (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );
};

describe('Application Routing', () => {
  window.ResizeObserver = ResizeObserver;

  describe('No authorized routes', () => {
    const store = mockStore({
      [SliceName.Auth]: { isAuth: false, isReady: false },
    });

    it('render "Intro" when user navigate to "/"', () => {
      history.push(RouteName.Intro);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('intro-page')).toBeInTheDocument();
    });

    it('render "Login" when user navigate to "/login"', () => {
      history.push(RouteName.Login);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('login-page-component')).toBeInTheDocument();
    });

    it('render "signup" when user navigate to "/signup"', () => {
      history.push(RouteName.Signup);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('signup-page-component')).toBeInTheDocument();
    });

    it('Redirect to "404" error page if invalid path', () => {
      history.push(INVALID_PATH);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.NotFound);
    });

    it('Redirect to "Home" if user is authorized as role user', () => {
      const store = mockStore({
        [SliceName.Auth]: { authRole: Role.User, isAuth: true },
      });

      history.push(RouteName.Login);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Home);
    });

    it('Redirect to "Account" if user is authorized as role coach', () => {
      const store = mockStore({
        [SliceName.Auth]: { authRole: Role.Coach, isAuth: true },
      });

      history.push(RouteName.Login);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Account);
    });
  });

  describe('Role User', () => {
    const mockUser = makeFakeUser(Role.User);
    const store = mockStore({
      [SliceName.Auth]: { authRole: Role.User, isAuth: true },
      [SliceName.User]: { user: mockUser },
      ...slices,
    });

    it('render "Question user"', () => {
      history.push(RouteName.Question);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('user-question-form')).toBeInTheDocument();
    });

    it('render "Home" when user navigate to "/"', () => {
      history.push(RouteName.Home);
      render(<MocApp store={store} />);
      expect(screen.getByText('FitFriends — Время находить тренировки, спортзалы и друзей спортсменов')).toBeInTheDocument();
    });

    it('render "Account user" when user navigate to "/account"', () => {
      history.push(RouteName.Account);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('user-account-page')).toBeInTheDocument();
    });

    it('render "Users" when user navigate to "/users"', () => {
      history.push(RouteName.Users);
      render(<MocApp store={store} />);
      expect(screen.getByText('Каталог пользователей')).toBeInTheDocument();
    });

    it('render "Trainings" when user navigate to "/trainings"', () => {
      history.push(RouteName.Trainings);
      render(<MocApp store={store} />);
      expect(screen.getByText('Каталог тренировок')).toBeInTheDocument();
    });

    it('render "Friends" when user navigate to "/friends"', () => {
      history.push(RouteName.Friends);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('user-friends')).toBeInTheDocument();
    });

    it('render "Purchases" when user navigate to "/purchases"', () => {
      history.push(RouteName.Purchases);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('purchases-page-component')).toBeInTheDocument();
    });

    it('render "User card" when user navigate to "/user/:id"', () => {
      history.push(generatePath(RouteName.UserCard, { id: MockData.Id }));
      render(<MocApp store={store} />);
      expect(screen.getByTestId('user-card-component')).toBeInTheDocument();
    });

    it('render "Training card" when user navigate to "/trainings/:id"', () => {
      history.push(generatePath(RouteName.TrainingCard, { id: MockData.Id }));
      render(<MocApp store={store} />);
      expect(screen.getByTestId('training-card-page-component')).toBeInTheDocument();
    });

    it('render "MyTrainings" when user navigate to "/my-trainings"', () => {
      history.push(RouteName.MyTrainings);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Home);
    });

    it('render "Orders" when user navigate to "/orders"', () => {
      history.push(RouteName.Orders);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Home);
    });

    it('render "AddTraining" when user navigate to "/raining/add"', () => {
      history.push(RouteName.AddTraining);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Home);
    });

    it('Redirect to "Intro" if user unauthorized', () => {
      const store = mockStore({
        [SliceName.Auth]: { isAuth: false },
      });

      history.push(RouteName.AddTraining);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Intro);
    });
  });

  describe('Role Coach', () => {
    const mockUser = makeFakeUser(Role.Coach);
    const store = mockStore({
      [SliceName.Auth]: { isReady: true, authRole: Role.Coach, isAuth: true },
      [SliceName.User]: { user: mockUser },
      ...slices,
    });

    it('render "Question user"', () => {
      history.push(RouteName.Question);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('coach-question-form')).toBeInTheDocument();
    });

    it('redirect to "Account coach" when user navigate to "/"', () => {
      history.push(RouteName.Home);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Account);
    });

    it('render "Account coach" when user navigate to "/account"', () => {
      history.push(RouteName.Account);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('coach-account-page')).toBeInTheDocument();
    });

    it('render "Friends" when user navigate to "/friends"', () => {
      history.push(RouteName.Friends);
      render(<MocApp store={store} />);
      expect(screen.getByTestId('coach-friends')).toBeInTheDocument();
    });

    it('render "MyTrainings" when user navigate to "/my-trainings"', () => {
      history.push(RouteName.MyTrainings);
      render(<MocApp store={store} />);
      expect(screen.getByText('Мои тренировки')).toBeInTheDocument();
    });

    it('render "Orders" when user navigate to "/orders"', () => {
      history.push(RouteName.Orders);
      render(<MocApp store={store} />);
      expect(screen.getByText('Мои заказы')).toBeInTheDocument();
    });

    it('render "AddTraining" when user navigate to "/raining/add"', () => {
      history.push(RouteName.AddTraining);
      render(<MocApp store={store} />);
      expect(screen.getByText('Создание тренировки')).toBeInTheDocument();
    });

    it('render "User card" when user navigate to "/user/:id"', () => {
      history.push(generatePath(RouteName.UserCard, { id: MockData.Id }));
      render(<MocApp store={store} />);
      expect(screen.getByTestId('coach-card-component')).toBeInTheDocument();
    });

    it('render "Training card" when user navigate to "/trainings/:id"', () => {
      history.push(generatePath(RouteName.TrainingCard, { id: MockData.Id }));
      render(<MocApp store={store} />);
      expect(screen.getByTestId('training-card-page-component')).toBeInTheDocument();
    });

    it('Redirect to "Account" when coach navigate to "/purchases"', () => {
      history.push(RouteName.Purchases);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Account);
    });

    it('render "Users" when user navigate to "/users"', () => {
      history.push(RouteName.Users);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Account);
    });

    it('render "Trainings" when user navigate to "/trainings"', () => {
      history.push(RouteName.Trainings);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Account);
    });

    it('Redirect to "Intro" if user unauthorized', () => {
      const store = mockStore({
        [SliceName.Auth]: { isAuth: false },
      });

      history.push(RouteName.AddTraining);
      render(<MocApp store={store} />);
      expect(history.location.pathname).toBe(RouteName.Intro);
    });
  });
});
