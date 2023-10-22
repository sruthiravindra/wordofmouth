import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { userReducer } from '../features/user/userSlice';
import { reviewsReducer } from '../features/reviews/reviewsSlice';
import { workersReducer } from '../features/workers/workersSlice';
import { servicesReducer } from '../features/services/servicesSlice';
import { requestsReducers } from '../features/requests/requestsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    reviews: reviewsReducer,
    workers: workersReducer,
    services: servicesReducer,
    requests: requestsReducers
  },
});
