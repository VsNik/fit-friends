import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SliceName } from '../../../constants/common';
import { ButtonSortDirection } from './button-sort-direction';
import { TrainingSortDirection } from '@fit-friends/shared';

const mockStore = configureMockStore([thunk]);
type MockStore = ReturnType<typeof mockStore>;
const history = createMemoryHistory();
const onClick = jest.fn();

const MOCK_TEXT = 'some-text';

enum Svg {
  Desc = '/assets/img/sprite.svg#icon-sort-up',
  Asc = '/assets/img/sprite.svg#icon-sort-down',
}

const MockButtonSortDirection = ({
  store,
  text,
  direction,
  active = false,
  disabled = false,
}: {
  store: MockStore;
  text: string;
  direction: TrainingSortDirection;
  active?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <ButtonSortDirection text={text} direction={direction} active={active} disabled={disabled} onClick={onClick} />
      </Provider>
    </Router>
  );
};

describe('Component: Button Sort Direction', () => {
  it('Show text and direction icon "DESC", if passed parametr "text", "direction = desc', () => {
    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockButtonSortDirection store={store} text={MOCK_TEXT} direction={TrainingSortDirection.Desc} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
    expect(screen.getByTestId('direct-icon').firstChild).toHaveAttribute('xlink:href', Svg.Desc);
  });

  it('Show text and direction icon "ASC", if passed parametr "text", "direction = asc', () => {
    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockButtonSortDirection store={store} text={MOCK_TEXT} direction={TrainingSortDirection.Asc} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
    expect(screen.getByTestId('direct-icon').firstChild).toHaveAttribute('xlink:href', Svg.Asc);
  });

  it('Add class "active", if passed parametr "active"', () => {
    const store = mockStore({
      [SliceName.Auth]: {},
    });

    render(<MockButtonSortDirection store={store} text={MOCK_TEXT} direction={TrainingSortDirection.Asc} active />);

    expect(screen.getByRole('button').classList.contains('active')).toBe(true);
  });
});
