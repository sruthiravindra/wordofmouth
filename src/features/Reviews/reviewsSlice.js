import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { getDocs, addDoc } from 'firebase/firestore';

const initialState = {
    reviewsArray: [],
    isLoading: true,
    errMsg: ''
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async () => {
        const collectionRef = collection(database, "reviewData");
        const querySnapshot = await getDocs(collectionRef);
        if (querySnapshot.empty || !querySnapshot.size) {
            return Promise.reject("Unable to fetch, status :" + querySnapshot.status);
        }

        const data = querySnapshot.docs.map((doc) => {
            return { id:doc.id,...doc.data() }
        });
        return data;
    }
)

export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (data, {dispatch}) => {
        try {
            const collectionRef = collection(database, "reviewData");
            await addDoc(collectionRef, data);
            dispatch(postReview(data));
        } catch (error) {
            console.log(error.message);
        }
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
