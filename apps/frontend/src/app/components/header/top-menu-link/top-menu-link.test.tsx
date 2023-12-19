import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { TopMenuLink } from './top-menu-link';
import userEvent from '@testing-library/user-event';

enum MockLink {
  Url = '/some-link',
  Title = 'Some Title',
}

const history = createMemoryHistory();
const onClick = jest.fn();

const MockTopMenuLink = ({ to, title, isActive = false }: { to: string; title: string; isActive?: boolean }) => {
  return (
    <Router location={history.location} navigator={history}>
      <TopMenuLink to={to} title={title} icon="icon-home" isActive={isActive} onClick={onClick} dataTestId="top-menu-link" />
    </Router>
  );
};

describe('Component: Top menu link', () => {
  it('Correct render', () => {
    render(<MockTopMenuLink to={MockLink.Url} title={MockLink.Title} />);

    const link = screen.getByTestId('top-menu-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', MockLink.Url);
    expect(link).toHaveAttribute('title', MockLink.Title);
    expect(link.classList.contains('is-active')).toBe(false);
  });

  it('Add "is-active" class, if passed "isActive" parametr', () => {
    render(<MockTopMenuLink to={MockLink.Url} title={MockLink.Title} isActive />);

    const link = screen.getByTestId('top-menu-link');
    expect(link.classList.contains('is-active')).toBe(true);
  });

  it('Click to link', async () => {
    render(<MockTopMenuLink to={MockLink.Url} title={MockLink.Title} isActive />);

    const link = screen.getByTestId('top-menu-link');
    expect(link.classList.contains('is-active')).toBe(true);

    await userEvent.click(link);
    expect(onClick).toBeCalledTimes(1);
    onClick.mockClear();
  });
});
