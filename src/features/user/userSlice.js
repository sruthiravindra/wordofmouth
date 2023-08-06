import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser:null
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setCurrentUser : (state,action)=>{
            return {
                ...state,
                currentUser: action.payload 
            }
        }
    }
});

export const userReducer = usersSlice.reducer;
export const {setCurrentUser} = usersSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;