import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost, axiosPut } from '../../utils/axiosConfig';

// ============================ async actions =================================

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        try {
            const response = await axiosGet('requests');
            return response.data.requests;
        } catch (err) {
            return Promise.reject(err);
        }
    }   
);

export const createRequest = createAsyncThunk(
    'requests/createRequest',
    async (request) => {
        try {
            const response = await axiosPost('requests', request);
            return response.data.request;
        } catch (err) {
            return Promise.reject(err);
        }
    }  
);

export const updateRequest = createAsyncThunk(
    'requests/updateRequest',
    async (data, {dispatch}) => {
        try {
            const { request_id, status } = data;
            const response = await axiosPut(`requests/${request_id}`, { status: status })
            //add the from_id to the current user's contacts array
            return response.data.request;
        } catch (err) {
            return Promise.reject(err);
        }
    } 
);

// ============================ slice definition =================================

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
            state.errMsg = 'Failed to fetch requests :: ' + action.error.message;
        },
        [createRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [createRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
        },
        [createRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to send request :: ' + action.error.message;
        },
        [updateRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [updateRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const updatedRequests = state.requestsArray.filter(request =>
                request._id !== action.payload.request._id    
            );
            state.requestsArray = updatedRequests;
        },
        [updateRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to respond to request :: ' + action.error.message;
        }
    }
});

export const requestsReducers = requestsSlice.reducer;