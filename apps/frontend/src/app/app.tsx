import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { IntroPage } from './pages/intro/intro-page';
import { LoginPage } from './pages/login/login-page';
import { SignupPage } from './pages/signup/signup-page';
import { QuestionUserPage } from './pages/question-user/question-user-page';
import { QuestionCoachPage } from './pages/question-coach/question-coach-page';
import { AccountPage } from './pages/account/account-page';
import { history } from './utils/history';
import { HomePage } from './pages/home/home-page';
import { TrainingsPage } from './pages/trainings/trainings';

export enum RouteName {
  Home = '/',
  Intro = '/intro',
  Login = '/login',
  Signup = '/signup',
  QuestionUser = '/question-user',
  QuestionCoach = '/question-coach',
  Account = '/account/:id',
  Trainings = '/trainings',
}

export function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Routes>
      <Route path={RouteName.Home} element={<HomePage />} />
      <Route path={RouteName.Intro} element={<IntroPage />} />
      <Route path={RouteName.Login} element={<LoginPage />} />
      <Route path={RouteName.Signup} element={<SignupPage />} />
      <Route path={RouteName.QuestionUser} element={<QuestionUserPage />} />
      <Route path={RouteName.QuestionCoach} element={<QuestionCoachPage />} />
      <Route path={RouteName.Account} element={<AccountPage />} />
      <Route path={RouteName.Trainings} element={<TrainingsPage />} />
    </Routes>
  );
}

export default App;
