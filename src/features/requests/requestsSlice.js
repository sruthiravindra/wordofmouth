import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost, axiosPut } from '../../utils/axiosConfig';

// ============================ async actions =================================

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        const response = await axiosGet('requests');
        if (response.status >= 200 && response.status < 300) { return response.data.requests }
        return Promise.reject(response.data.message); 
    }   
);

export const createRequest = createAsyncThunk(
    'requests/createRequest',
    async (request) => {
        const response = await axiosPost('requests', request)
        if (response.status >= 200 && response.status < 300) { return response.data.request }
        return Promise.reject(response.data.message); 
    }  
);

export const updateRequest = createAsyncThunk(
    'requests/updateRequest',
    async (data, {dispatch}) => {
        const { request_id, status } = data;
        const response = await axiosPut(`requests/${request_id}`, { status: status })
        if (response.status >= 200 && response.status < 300) { 
            //add the from_id to the current user's contacts array
            return response.data.request;
        }
        return Promise.reject(response.data.message); 
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
            state.errMsg = 'Failed to fetch requests :: ' + action.payload;
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
            state.errMsg = 'Failed to send request :: ' + action.payload;
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
            state.errMsg = 'Failed to respond to request :: ' + action.payload;
        }
    }
});

export const requestsReducers = requestsSlice.reducer;