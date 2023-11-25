import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { IntroPage } from './pages/intro/intro-page';
import { LoginPage } from './pages/login/login-page';
import { SignupPage } from './pages/signup/signup-page';
import { QuestionUserPage } from './pages/question-user/question-user-page';
import { QuestionCoachPage } from './pages/question-coach/question-coach-page';
import { AccountPage } from './pages/account/account-page';
import { history } from './utils/history';
import { HomePage } from './pages/home/home-page';
import { TrainingsPage } from './pages/trainings/trainings-page';
import { TrainingCardPage } from './pages/training-card/training-card-page';
import { NotFound } from './pages/404/404';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { UsersPage } from './pages/users/users-page';
import { UserPage } from './pages/user/user-page';
import { FriendsPage } from './pages/friends/friends-page';
import { store } from './store';
import { checkAuthAction } from './store/auth/async-actions';
import * as authSelector from './store/auth/auth-select';
import { useAppSelector } from './store/hooks';
import { RouteName } from './constants/route';
import { Loader } from './components/loader/loader';
import { PurchasesPage } from './pages/purchases/purchases-page';
import { OrdersPage } from './pages/orders/orders-page';

store.dispatch(checkAuthAction());

export function App() {  
  history.navigate = useNavigate();
  history.location = useLocation();

  const isLoading = useAppSelector(authSelector.isLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path={RouteName.Intro} element={<IntroPage />} />
      <Route path={RouteName.Login} element={<LoginPage />} />
      <Route path={RouteName.Signup} element={<SignupPage />} />
      <Route path={RouteName.QuestionUser} element={<QuestionUserPage />} />
      <Route path={RouteName.QuestionCoach} element={<QuestionCoachPage />} />

      <Route element={<ProtectedRoute accessRole={Role.User} />}>
        <Route path={RouteName.Home} element={<HomePage />} />
        <Route path={RouteName.Trainings} element={<TrainingsPage />} />
        <Route path={RouteName.Users} element={<UsersPage />} />
        <Route path={RouteName.Purchases} element={<PurchasesPage />} />
      </Route>

      <Route element={<ProtectedRoute accessRole={Role.Coach} />}>
        <Route path={RouteName.Orders} element={<OrdersPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={RouteName.Account} element={<AccountPage />} />
        <Route path={RouteName.TrainingCard} element={<TrainingCardPage />} />
        <Route path={RouteName.UserCard} element={<UserPage />} />
        <Route path={RouteName.Friends} element={<FriendsPage />} />
      </Route>

      <Route path={RouteName.NotFound} element={<NotFound />} />
      <Route path="*" element={<Navigate to={RouteName.NotFound} replace />} />
    </Routes>
  );
}

export default App;
