import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import userReducer from './user/user-slice';
import usersReducer from './users/users-slice';
import trainingsReducer from './trainings/trainings-slice';
import forYouReducer from './trainings/for-you-slice';
import specialReducer from './trainings/special-slice';
import popularReducer from './trainings/popular-slice';
import reviewsReducer from './reviews/reviews-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    trainings: trainingsReducer,
    forYouTrainings: forYouReducer, 
    specialTrainings: specialReducer,
    popularTrainings: popularReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;