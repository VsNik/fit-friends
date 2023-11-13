import {Routes, Route} from 'react-router-dom';
import { IntroPage } from './pages/intro/intro-page';
import { LoginPage } from './pages/login/login-page';
import { SignupPage } from './pages/signup/signup-page';
import { QuestionUser } from './pages/question-user/question-user-page';
import { QuestionCoach } from './pages/question-coach/question-coach';

export enum RouteName {
  Intro = '/',
  Login = '/login',
  Signup = '/signup',
  QuestionUser = '/question-user',
  QuestionCoach = '/question-coach',
}

export function App() {
  return (
    <Routes>
      <Route path={RouteName.Intro} element={<IntroPage />} />
      <Route path={RouteName.Login} element={<LoginPage />} />
      <Route path={RouteName.Signup} element={<SignupPage />} />
      <Route path={RouteName.QuestionUser} element={<QuestionUser />} />
      <Route path={RouteName.QuestionCoach} element={<QuestionCoach />} />
    </Routes>
  );
}

export default App;
