import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

const initialState = {
    currentUser:null,
    isLoading: true,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    errMsg:''
};

export const userSignup = createAsyncThunk(
    'user/signup',
    async({username,password,firstName, lastName},{dispatch})=>{
        console.log({ username, password, first_name: firstName, last_name: lastName })
        const response = await fetch(baseUrl+'users/signup',{
            method:'POST',
            body:JSON.stringify({ username, password, first_name: firstName, last_name: lastName }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        if (data.success) {
            dispatch(userLogin({ username, password }));
        }
        return data;
    }
);

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { dispatch }) => {
        const response = await fetch(baseUrl + 'users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return Promise.reject(response.status);
        }

        const data = await response.json();
        dispatch(setCurrentUser(data));
        return data;
    }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    const response = await fetch(baseUrl + 'users/logout', {
        headers: {
            Authorization: bearer,
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    });

    // Remove the token on client side no matter what happens with the fetch
    localStorage.removeItem('token');

    if (!response.ok) {
        return Promise.reject(
            'There was a problem with logging out on the server side, status: ' +
                response.status
        );
    }

    const data = await response.json();
    return data;
});

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setCurrentUser : (state,action)=>{
            // return {
            //     ...state,
            //     currentUser: action.payload 
            // }
            state.currentUser = action.payload.profile;
            state.isLoading = false;
        },
        clearCurrentUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = [];
            state.isLoading = false;
            localStorage.removeItem('token');
        }
    },
        extraReducers:{
        [userLogin.pending]: (state) => {
            state.errMsg = '';
            state.isLoading = true;
            localStorage.removeItem('token');
        },
        [userLogin.fulfilled]: (state, action) => {
            state.isLoading = false;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('currentUserProfile', JSON.stringify(action.payload.profile));
            console.log(
                `Login successful for user with _id: ${action.payload.id}`
            );
            console.log('setting profile in local storage', action.payload.profile)
        },
        [userLogin.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Login failed. :: '+ action.error.message;
            localStorage.removeItem('token');
        },        
        [userLogout.fulfilled]: (state) => {
            state.errMsg = '';
            state.isLoading = false;
            state.currentUser = null;
            localStorage.setItem('currentUserProfile', "")
        },
        [userLogout.rejected]: (state) => {
            state.isLoading = false;
            state.errMsg = 'There was a problem with logging out on the server side ';
            state.currentUser = null;
        },
    }
});

export const userReducer = usersSlice.reducer;
export const {setCurrentUser, clearCurrentUser} = usersSlice.actions;
export const isAuthenticated = () => {
    console.log(localStorage.getItem('token') , 'token');
    return localStorage.getItem('token') ? true : false;
};
export const selectCurrentUser = (state) => state.user.currentUser;