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
    return state.reviews.reviewsArray.filter(
        (review) => review.userId === parseInt(userId)
    );
};

export const calculateReviewAverage = (selectedReviews) => {
    const total = selectedReviews.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0)
    return total / selectedReviews.length;
}
