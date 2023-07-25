import { USERS } from '../../app/shared/USERS';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usersArray: USERS
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: state.usersArray.lenght + 1,
                ...action.payload
            };
            state.usersArray.push(newUser);
        },
        updateRating: (state, action) => {

        }
    }
});

export const usersReducers = usersSlice.reducer;
export const {addUser, updateRating} = usersSlice.actions;

export const selectAllUsers = (state) => {
    return state.users.usersArray;
};
export const selectWorkers = (state) => {
    return state.users.usersArray.filter((user) => user.worker === true );
};
export const selectUserById = (id) => (state) => {
    return state.users.usersArray.find((user) => user.id === parseInt(id));
};
export const selectUserByEmailPassword = ({email, password}) => (state) => {
    return state.users.usersArray.filter((user)=> user.email === email && user.password === password);
};
