import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost, axiosPut } from '../../utils/axiosConfig';

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
            console.log('response', response);
            return response;
        } catch (err) {
            return Promise.reject("Unable to send request", err);
        }
    }  
)

export const updateRequest = createAsyncThunk(
    'requests/updateRequest',
    async (data, {dispatch}) => {
        try {
            const { request_id, status } = data;
            console.log('data', data)
            const response = await axiosPut(`requests/${request_id}`, { status: status })
            console.log('response', response);
            //add the from_id to the current user's contacts array
            return response
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
            state.requestsArray.push(action.payload);
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
            const updatedRequests = state.requestsArray.filter(request =>
                request._id !== action.payload.request._id    
            );
            state.requestsArray = updatedRequests;
        },
        [updateRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const requestsReducers = requestsSlice.reducer;