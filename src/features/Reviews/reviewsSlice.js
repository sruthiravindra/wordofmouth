import { REVIEWS } from '../../app/shared/REVIEWS';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviewsArray: REVIEWS
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addReview: (state, action) => {
            const newReview = {
                id: state.reviewsArray.length + 1,
                ...action.payload
            };
            state.reviewsArray.push(newReview);
        }
    }
});

export const reviewsReducer = reviewsSlice.reducer;
export const { addReview } = reviewsSlice.actions;

export const selectReviewsByUserId = (userId) => (state) => {
    return REVIEWS.filter((review) => review.userId === userId);
};
