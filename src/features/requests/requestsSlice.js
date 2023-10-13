import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost } from '../../utils/axiosConfig';

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        try {
            const response = await axiosGet('requests');
            return response;
        } catch (err) {
            return Promise.reject("Unable to fetch sent requests", err);
        }
    }   
)

export const createRequest = createAsyncThunk(
    'requests/createRequest',
    async (request) => {
        try {
            const response = await axiosPost('requests', request)
            return response;
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
    requestsArray: [],
    isLoading: false,
    errMsg: '',
}

const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchRequests.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchRequests.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.requestsArray = action.payload;
        },
        [fetchRequests.rejected]: (state, action) => {
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