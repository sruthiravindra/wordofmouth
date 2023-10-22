import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosGet, axiosPut, axiosPost } from '../../utils/axiosConfig';

// ============================ async actions =================================

export const userSignup = createAsyncThunk(
    'user/signup',
    async({ username, password, firstName, lastName },{dispatch})=>{
        try {
            const newUser = { username, password, first_name: firstName, last_name: lastName };
            const response = await axiosPost('users/signup', newUser);
            dispatch(userLogin({ username, password }));
            return response.data;
        } catch (err) {
            return Promise.reject(err) 
        }
    }
);

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { dispatch }) => {
        try {
            const response = await axiosPost('users/login', { username, password });
            dispatch(setCurrentUser(response.data));
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export const userLogout = createAsyncThunk(
    'user/logout', 
    async () => {
        try {
            const response = await axiosGet('users/logout');
            // Remove the token on client side no matter what happens with the fetch
            localStorage.removeItem('token');
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'users/updateUserProfile', 
    async (data, {dispatch}) => {
        try {
            const response = await axiosPut(`profiles/${data.currentUserId}`, data.profile);
            dispatch(setCurrentUser(response.data));
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }    
    }
);

// ============================ slice definition =================================

const initialState = {
    currentUser:null,
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    errMsg:''
};


const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setCurrentUser : (state, action) => {
            state.currentUser = action.payload.profile;
        },
        clearCurrentUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = [];
            state.isLoading = false;
            localStorage.removeItem('token');
        },
        pushContact : (state, action) => {
            state.currentUser.contacts.push(action.payload);
        }
    },
    extraReducers:{
        [userSignup.pending]: (state) => {
            state.errMsg = '';
            state.isLoading = true;
            localStorage.removeItem('token');
        },
        [userSignup.fulfilled]: (state) => {
            state.isLoading = false;
            console.log(`Sign up successful! Logging in now...`);
        },
        [userSignup.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Sign up failed :: ' + action.error.message;
        },
        [userLogin.pending]: (state) => {
            state.errMsg = '';
            state.isLoading = true;
            localStorage.removeItem('token');
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            localStorage.setItem('token', action.payload.token);
            console.log(`Login successful for user with _id: ${action.payload.id}`);
        },
        [userLogin.rejected]: (state, action) => {
            console.log('action', action)
            state.isLoading = false;
            state.errMsg = 'Login failed :: ' + action.error.message;
            localStorage.removeItem('token');
        },        
        [userLogout.fulfilled]: (state) => {
            state.errMsg = '';
            state.isLoading = false;
            state.currentUser = null;
            localStorage.removeItem('currentUserProfile');
            localStorage.removeItem('token');
        },
        [userLogout.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Logout failed :: ' + action.error.message;
            state.currentUser = null;
        },
        [updateUserProfile.pending]: (state) => {
            state.errMsg = '';
            state.isLoading = true;
        },
        [updateUserProfile.fulfilled]: (state) => {
            state.isLoading = false;
            console.log('Update user profile successful!');
        },
        [updateUserProfile.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Update user profile failed. :: ' + action.error.message;
        }
    }
});

export const userReducer = usersSlice.reducer;
export const {setCurrentUser, clearCurrentUser, pushContact} = usersSlice.actions;

// ============================ selectors =================================

export const isAuthenticated = () => {
    console.log(localStorage.getItem('token') , 'token');
    return localStorage.getItem('token') ? true : false;
};
export const selectCurrentUser = (state) => state.user.currentUser;