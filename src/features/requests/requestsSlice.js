import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost } from '../../utils/axiosConfig';

export const fetchSentRequests = createAsyncThunk(
    'requests/fetchSentRequests',
    async (currentProfileId) => {
        try {

        } catch (err) {
            return Promise.reject("Unable to fetch sent requests", err);
        }
    }   
)

export const fetchReceivedRequests = createAsyncThunk(
    'requests/fetchReceivedRequests',
    async (currentProfileId) => {
        try {

        } catch (err) {
            return Promise.reject("Unable to fetch received requests", err);
        }
    }   
)

export const createRequest = createAsyncThunk(
    async (currentProfileId, requestedProfileId) => {
        try {

        } catch (err) {
            return Promise.reject("Unable to send request", err);
        }
    }  
)

export const updateRequest = createAsyncThunk(
    'requests/updateRequest',
    async (status) => {
        try {

        } catch (err) {
            return Promise.reject("Unable to update request", err);
        }
    } 
)

const initialState = {
    sentRequestsArray: [],
    receivedRequestsArray: [],
    isLoading: true,
    errMsg: '',
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSentRequests.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchSentRequests.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.sentRequestsArray = action.payload;
        },
        [fetchSentRequests.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchReceivedRequests.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchReceivedRequests.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.receivedRequestsArray = action.payload;
        },
        [fetchReceivedRequests.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [createRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [createRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.sentRequestsArray.push(action.payload);
        },
        [createRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [updateRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [updateRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const updatedRequests = state.receivedRequestsArray.map(request => {
                if (request._id === action.payload._id) {
                    return action.payload;
                } else {
                    return request;
                }
            });
            state.receivedRequestsArray = updatedRequests;
        },
        [updateRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const requestsReducers = requestsSlice.reducer;