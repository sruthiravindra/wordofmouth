import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { userReducer } from '../features/user/userSlice';
import { reviewsReducer } from '../features/Reviews/reviewsSlice';
import { usersReducers } from '../features/Users/UsersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    reviews: reviewsReducer,
    users: usersReducers
  },
});
