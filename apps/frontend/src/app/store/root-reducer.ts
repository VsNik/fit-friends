import { combineReducers } from "@reduxjs/toolkit";
import { SliceName } from "../constants/common";
import { authSlice } from "./auth/auth-slice";
import { userSlice } from "./user/user-slice";
import { usersSlice } from "./users/users-slice";
import { trainingSlice } from "./training/training-slice";
import { trainingsSlice } from "./trainings/trainings-slice";
import { forYouSlice } from "./trainings/for-you-slice";
import { specialSlice } from "./trainings/special-slice";
import { popularSlice } from "./trainings/popular-slice";
import { reviewsSlice } from "./reviews/reviews-slice";
import { notificationsSlice } from "./notifications/notifications-slice";
import { orderSlice } from "./order/order-slice";
import { invitationsSlice } from "./invitations/invitations.slice";

export const rootReducer = combineReducers({
    [SliceName.Auth]: authSlice.reducer,
    [SliceName.User]: userSlice.reducer,
    [SliceName.Users]: usersSlice.reducer,
    [SliceName.Training]: trainingSlice.reducer,
    [SliceName.Trainings]: trainingsSlice.reducer,
    [SliceName.ForYou]: forYouSlice.reducer,
    [SliceName.Special]: specialSlice.reducer,
    [SliceName.Popular]: popularSlice.reducer,
    [SliceName.Reviews]: reviewsSlice.reducer,
    [SliceName.Notifications]: notificationsSlice.reducer,
    [SliceName.Order]: orderSlice.reducer,
    [SliceName.Invites]: invitationsSlice.reducer,
})