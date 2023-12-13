import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IUser, Role } from '@fit-friends/shared';
import { SliceName } from '../../../constants/common';
import { makeFakeUser } from '../../../utils/mock-data';
import {UserInfoForm} from './user-info-form';
import React from 'react';

const mockStore = configureMockStore([thunk]);
type StoreType = ReturnType<typeof mockStore>;
const history = createMemoryHistory();

interface UserInfoProps {
  isEditable: boolean;
  store: StoreType;
  fakeUser: IUser;
}


const MockUserInfo: React.FC<UserInfoProps> = ({ fakeUser, store, isEditable }) => {
  return (
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <UserInfoForm user={fakeUser} isEditable={isEditable} setEditable={() => {}} setAvatarError={() => {}} />
      </Provider>
    </Router>
  );
}

describe('Component: user-info', () => {
    it('No edit mod test', () => {
      const fakeUser = makeFakeUser(Role.User);
      const store = mockStore({
        [SliceName.Auth]: { authRole: Role.User },
        [SliceName.User]: { user: fakeUser },
        [SliceName.Notifications]: {},
      });

      render(<MockUserInfo fakeUser={fakeUser} store={store} isEditable={false} />);

      const button = screen.getByTestId("set-edit-btn");
      expect(button).toBeInTheDocument();

      const nameInput = screen.getByTestId('input-name-element');
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toBeDisabled();
      
      const descTextarea = screen.getByTestId('textarea-desc-element');
      expect(descTextarea).toBeInTheDocument();
      expect(descTextarea).toBeDisabled();

      const toggler = screen.getByTestId('toggler-ready-checkbox');
      expect(toggler).toBeInTheDocument();
      expect(toggler).toBeDisabled();

      const specializationGroup = screen.getAllByTestId('btn-checkbox-element');      
      for (const el of specializationGroup) {
        expect(el).toBeInTheDocument();
        expect(el).toBeDisabled();
      }

      const selects = screen.getAllByTestId('select-element');
      expect(selects.length).toEqual(3);
      for (const el of selects) {
        expect(el).toBeInTheDocument();
        expect(el).toBeDisabled();
      }
    })

    it('edit mod test', async () => {
      const fakeUser = makeFakeUser(Role.User);
      const store = mockStore({
        [SliceName.Auth]: { authRole: Role.User },
        [SliceName.User]: { user: fakeUser },
        [SliceName.Notifications]: {},
      });

      render(<MockUserInfo fakeUser={fakeUser} store={store} isEditable={true} />);

      expect(screen.queryByTestId('set-edit-btn')).toBeNull();
      expect(screen.queryByTestId('user-edit-btn')).toBeInTheDocument();

      const nameInput = screen.getByTestId('input-name-element');
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).not.toBeDisabled();
      
      const descTextarea = screen.getByTestId('textarea-desc-element');
      expect(descTextarea).toBeInTheDocument();
      expect(descTextarea).not.toBeDisabled();

      const toggler = screen.getByTestId('toggler-ready-checkbox');
      expect(toggler).toBeInTheDocument();
      expect(toggler).not.toBeDisabled();

      const specializationGroup = screen.getAllByTestId('btn-checkbox-element');      
      for (const el of specializationGroup) {
        expect(el).toBeInTheDocument();
        expect(el).not.toBeDisabled();
      }

      const selects = screen.getAllByTestId('select-element');
      expect(selects.length).toEqual(3);
      for (const el of selects) {
        expect(el).toBeInTheDocument();
        expect(el).not.toBeDisabled();
      }
    })
});