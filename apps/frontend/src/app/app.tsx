import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { IntroPage } from './pages/intro/intro-page';
import { LoginPage } from './pages/login/login-page';
import { SignupPage } from './pages/signup/signup-page';
import { history } from './utils/history';
import { HomePage } from './pages/home/home-page';
import { TrainingsPage } from './pages/trainings/trainings-page';
import { TrainingCardPage } from './pages/training-card/training-card-page';
import { NotFound } from './pages/404/404';
import { ProtectedRoute } from './components/routes/protected-route/protected-route';
import { UsersPage } from './pages/users/users-page';
import { UserPage } from './pages/user/user-page';
import { FriendsPage } from './pages/friends/friends-page';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { RouteName } from './constants/route';
import { Loader } from './components/loader/loader';
import { PurchasesPage } from './pages/purchases/purchases-page';
import { OrdersPage } from './pages/orders/orders-page';
import { MyTrainingsPage } from './pages/my-trainings/my-trainings-page';
import { AddTraining } from './pages/add-training/add-training-page';
import { fetchNotificationAction } from './store/notifications/async-actions';
import { AnonimousRoute } from './components/routes/anonimous-route/anonimous-route';
import * as authSelector from './store/auth/auth-select';
import { LoadStatus } from './constants/common';
import { QuestionPage } from './pages/question/question-page';
import { Account } from './pages/account/account';
import { getAccessToken } from './services/token';

export function App() {
  const dispatch = useAppDispatch()
  history.navigate = useNavigate();
  history.location = useLocation();

  const loadStatus = useAppSelector(authSelector.loadStatus);
  const isAuth = useAppSelector(authSelector.isAuth);

  useEffect(() => {
    if (isAuth && getAccessToken()) {
      dispatch(fetchNotificationAction());
    }
  }, [dispatch, isAuth]);

  if (loadStatus === LoadStatus.Loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path={RouteName.Intro} element={<IntroPage />} />

      <Route element={<AnonimousRoute />}>
        <Route path={RouteName.Login} element={<LoginPage />} />
        <Route path={RouteName.Signup} element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute redirect={RouteName.Intro} />}>
        <Route path={RouteName.Question} element={<QuestionPage />} />
      </Route>

      <Route element={<ProtectedRoute accessRole={Role.User} />}>
        <Route path={RouteName.Home} element={<HomePage />} />
        <Route path={RouteName.Trainings} element={<TrainingsPage />} />
        <Route path={RouteName.Users} element={<UsersPage />} />
        <Route path={RouteName.Purchases} element={<PurchasesPage />} />
      </Route>

      <Route element={<ProtectedRoute accessRole={Role.Coach} />}>
        <Route path={RouteName.Orders} element={<OrdersPage />} />
        <Route path={RouteName.MyTrainings} element={<MyTrainingsPage />} />
        <Route path={RouteName.AddTraining} element={<AddTraining />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={RouteName.Account} element={<Account />} />
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
