import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { IntroPage } from './pages/intro/intro-page';
import { LoginPage } from './pages/login/login-page';
import { SignupPage } from './pages/signup/signup-page';
import { QuestionUserPage } from './pages/question-user/question-user-page';
import { QuestionCoachPage } from './pages/question-coach/question-coach-page';
import { AccountPage } from './pages/account/account-page';
import { history } from './utils/history';
import { HomePage } from './pages/home/home-page';
import { TrainingsPage } from './pages/trainings/trainings';
import { TrainingCardPage } from './pages/training-card/training-card-page';
import { NotFound } from './pages/404/404';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Role } from '@fit-friends/shared';
import { UsersPage } from './pages/users/users-page';

export enum RouteName {
  Home = '/',
  Intro = '/intro',
  Login = '/login',
  Signup = '/signup',
  QuestionUser = '/question-user',
  QuestionCoach = '/question-coach',
  Account = '/account/:id',
  Trainings = '/trainings',
  TrainingCard = '/trainings/:id',
  NotFound = '/not-found',
  Users = '/users',
}

export function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

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
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={RouteName.Account} element={<AccountPage />} />
        <Route path={RouteName.TrainingCard} element={<TrainingCardPage />} />
      </Route>

      <Route path={RouteName.NotFound} element={<NotFound />} />
      <Route path="*" element={<Navigate to={RouteName.NotFound} replace />} />
    </Routes>
  );
}

export default App;
