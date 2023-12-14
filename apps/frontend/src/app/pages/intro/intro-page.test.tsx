import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import {IntroPage} from './intro-page';
import { RouteName } from '../../constants/route';

describe('Component: Intro page', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(RouteName.Intro);

    render(
      <Router location={history.location} navigator={history}>
        <IntroPage />
      </Router>,
    );

    expect(screen.getByTestId('intro-page')).toBeInTheDocument();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });
});