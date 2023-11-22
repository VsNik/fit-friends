import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './auth/auth-slice';
// import userReducer from './user/user-slice';
// import usersReducer from './users/users-slice';
// import trainingReducer from './training/training-slice';
// import trainingsReducer from './trainings/trainings-slice';
// import forYouReducer from './trainings/for-you-slice';
// import specialReducer from './trainings/special-slice';
// import popularReducer from './trainings/popular-slice';
// import reviewsReducer from './reviews/reviews-slice';
// import notificationsReducer from './notifications/notifications-slice';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
});

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     user: userReducer,
//     users: usersReducer,
//     training: trainingReducer,
//     trainings: trainingsReducer,
//     forYouTrainings: forYouReducer, 
//     specialTrainings: specialReducer,
//     popularTrainings: popularReducer,
//     reviews: reviewsReducer,
//     notifications: notificationsReducer,
//   },
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
