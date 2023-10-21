import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPost } from '../../utils/axiosConfig';

// ============================ async actions =================================

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (filterdata) => {
        const response = await axiosPost('reviews/fetchReviews', filterdata);
        if (response.status >= 200 && response.status < 300) { return response.data }
        return Promise.reject(response.data.message); 

    }
)

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (postdata, {dispatch}) => {
        const response = await axiosPost('reviews', postdata);
        if (response.status >= 200 && response.status < 300) { 
            return response.data; 
        }
        return Promise.reject(response.data.message); 
    }
);

// ============================ slice definition =================================

const initialState = {
    reviewsArray: [],
    ratingAverage: null,
    isLoading: true,
    errMsg: ''
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        postReview: (state, action) => {
            state.reviewsArray.push(action.payload)
        }
    },
    extraReducers: {
        [fetchReviews.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchReviews.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.reviewsArray = action.payload;
        },
        [fetchReviews.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to fetch reviews :: ' + action.payload;
        },
        [addReview.pending]: (state) => {
            state.isLoading = true;
        },
        [addReview.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.reviewsArray.push(action.payload);
            const ratingTotal = state.reviewsArray.reduce((acc, currReview) => {
                return acc + currReview.rating;
            }, 0 );
            const ratingAverage = ratingTotal / state.reviewsArray.length;
            state.ratingAverage = Math.round(ratingAverage * 10) / 10;
        },
        [addReview.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to post review :: ' + action.payload;
        }
    }
});

export const reviewsReducer = reviewsSlice.reducer;
export const { postReview } = reviewsSlice.actions;

// ============================ selectors =================================

export const selectReviewsByUserId = (userId) => (state) => {
    return state.reviews.reviewsArray.filter(
        (review) => review.userId === userId
    );
};

export const calculateReviewAverage = (selectedReviews) => {
    const total = selectedReviews.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0)
    return total / selectedReviews.length;
}
