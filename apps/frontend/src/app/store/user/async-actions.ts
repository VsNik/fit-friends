import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { UserInfoType } from '../../components/forms/user-info-form/user-info-form';
import { IUser } from '@fit-friends/shared';

import { fakeCoach } from '../../fake-data/fake-user';

const fetchUser = (): Promise<IUser> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakeCoach), 1000);
    })
}

const updateUser = (user: UserInfoType): Promise<UserInfoType> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => resolve(user), 1000);
  });
};

export const fetchUserAction = createAsyncThunk<IUser, undefined>(
    'user/fetch-user',
    async () => {
        const data = await fetchUser();
        return data;
    }
)

export const updateUserAction = createAsyncThunk<
  UserInfoType,
  UserInfoType,
  {
    dispatch: AppDispatch;
  }
>('user/update', async (user, { dispatch, rejectWithValue }) => {
  try {
    const data = await updateUser(user);
    // console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
