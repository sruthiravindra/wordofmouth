import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost, axiosPut } from '../../utils/axiosConfig';
import { pushContact } from '../user/userSlice';

// ============================ async actions =================================

export const fetchRequests = createAsyncThunk(
    'requests/fetchRequests',
    async () => {
        try {
            const response = await axiosGet('requests');
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }   
);

export const createRequest = createAsyncThunk(
    'requests/createRequest',
    async (request, {dispatch}) => {
        try {
            const response = await axiosPost('requests', request);
            await dispatch(fetchRequests());
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }  
);

export const updateRequest = createAsyncThunk(
    'requests/updateRequest',
    async (data, {dispatch}) => {
        try {
            const { request_id, from_id, status } = data;
            const response = await axiosPut(`requests/${request_id}`, { status: status })
            if (status === 'Approved') { 
                try {
                    const response = await axiosGet(`profiles/${from_id}`);
                    dispatch(pushContact(response.data.profile));
                } catch (err) {
                    return Promise.reject(err);
                }
            }
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
    reducers: {
        clearRequests: (state) => {
            state.requestsArray = [];
        }
    },
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
                request._id !== action.payload._id    
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
export const {clearRequests} = requestsSlice.actions;

export const findRequestByToId = (profileId) => (state) => {
    const found = state.requests.requestsArray.find(request =>
        request.to_id === profileId
    );
    if (found) return true;
    return false;
}