import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';


const initialState = {
    reviewsArray: [],
    isLoading: true,
    errMsg: ''
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async(filterdata)=>{
        const response = await fetch(baseUrl + 'reviews/fetchReviews',{
            body: JSON.stringify(filterdata),
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            return Promise.reject(response.status);
        }
        const data = await response.json();
        return data;
    }
)

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (postdata, { dispatch }) => {

        const bearer = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(baseUrl + 'reviews', {
            body: JSON.stringify(postdata),
            method: 'POST',
            headers:{
                Authorization: bearer,
                'Content-Type':'application/json'
            },
            credentials: 'same-origin'
        });

        if(!response.ok){
            return Promise.reject(response.status);
        }

        const data = await response.json();
        return data;
    }
);

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
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [addReview.pending]: (state) => {
            state.isLoading = true;
        },
        [addReview.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.reviewsArray.push(action.payload)
        },
        [addReview.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const reviewsReducer = reviewsSlice.reducer;
export const { postReview } = reviewsSlice.actions;

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
