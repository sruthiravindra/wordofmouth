import { SERVICES } from '../../app/shared/SERVICES';
import { USERS } from '../../app/shared/USERS';
import { createSlice, current } from '@reduxjs/toolkit';
import { searchServicesByTitle } from '../services/servicesSlice';

const initialState = {
    usersArray: USERS,
    filteredUsersArray: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: state.usersArray.length + 1,
                ...action.payload
            };
            state.usersArray.push(newUser);
        },
        getFilteredUsersArray: (state, action) => {
            let keyword = action.payload;
            const services_filtered = searchServicesByTitle(keyword);
            const services = services_filtered.map((service) => service.id)
            return (
                {
                    ...state,
                    filteredUsersArray: state.usersArray.map((user) => {
                        return (
                            {
                                ...user,
                                isMatch: user.services.some(item => services.includes(item))
                            }
                        )
                    }).filter((user) => user.isMatch === true)
                }

            )
        },
        updateRating: (state, action) => {

        }
    }
});

export const usersReducers = usersSlice.reducer;
export const { addUser, updateRating, getFilteredUsersArray } = usersSlice.actions;

export const selectAllUsers = (state) => {
    return state.users.usersArray;
};
export const selectWorkers = (state) => {
    return state.users.usersArray.filter((user) => user.worker === true);
};
export const selectUserById = (id) => (state) => {
    return state.users.usersArray.find((user) => user.id === parseInt(id));
};
export const selectUserByEmail = ({ email }) => (state) => {
    return state.users.usersArray.filter((user) => user.email === email);
};
export const selectUserByEmailPassword = ({ email, password }) => (state) => {
    return state.users.usersArray.filter((user) => user.email === email && user.password === password);
};
export const selectUsersByUserIdArray = (userIdArray) => (state) => {
    const userArray = [];
    state.users.usersArray.map(
        (user) => {
            if (userIdArray.includes(user.id)) userArray.push(user);
        }
    );
    return userArray;
};
