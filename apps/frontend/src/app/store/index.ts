import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user-slice';
import usersReducer from './users/users-slice';
import trainingsReducer from './trainings/trainings-slice';
import forYouReducer from './trainings/for-you-slice';
import specialReducer from './trainings/special-slice';
import popularReducer from './trainings/popular-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    trainings: trainingsReducer,
    forYouTrainings: forYouReducer, 
    specialTrainings: specialReducer,
    popularTrainings: popularReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
