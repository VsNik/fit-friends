import { Middleware } from 'redux';
import { Reducer } from '..';
import { history } from '../../utils/history';

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === 'app/redirectToRoute') {
    history.navigate(action.payload);
  }

  return next(action);
};
