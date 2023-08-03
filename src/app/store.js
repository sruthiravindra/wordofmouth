import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { userReducer } from '../features/user/userSlice';
import { reviewsReducer } from '../features/reviews/reviewsSlice';
import { usersReducers } from '../features/users/usersSlice';
import { servicesReducer } from '../features/services/servicesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    reviews: reviewsReducer,
    users: usersReducers,
    services: servicesReducer
  },
});
