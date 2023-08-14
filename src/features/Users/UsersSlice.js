import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { collection, getDocs, getDoc, addDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { searchServicesByTitle } from '../services/servicesSlice';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../user/userSlice';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const collectionRef = collection(database, "userData");
        const querySnapshot = await getDocs(collectionRef);
        if (querySnapshot.empty || !querySnapshot.size) {
            return Promise.reject("Unable to fetch, status :" + querySnapshot.status);
        }

        const data = await querySnapshot.docs.map((doc) => {
            return { id:doc.id,...doc.data() }
        });
        return data;
    }
)

export const addUsers = createAsyncThunk(
    'users/addUsers',
    async (user, { dispatch }) => {
        const collectionRef = collection(database, "userData");
        let newUser = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "profilePic": user.profilePic,
            "worker": false,
            "services":[],
            "contacts":[]
        };
        console.log(newUser);

        try {
            const querySnapshot = await addDoc(collectionRef, newUser);
            dispatch(addUser({id:querySnapshot.id,...newUser}));
            dispatch(setCurrentUser({id:querySnapshot.id,...newUser}));
        } catch (e) {
            return Promise.reject("Unable to create, status :" + e);
        }
    }
)

export const updateUserProfilePic = createAsyncThunk(
    'users/updateUserProfilePic',
    async(data,{dispatch})=>{

        const userId = data.id;
        const collectionRef = doc(database, "userData", userId );
        try{
            await updateDoc(collectionRef, {
                profilePic: data.image
            });
            
            const docSnap = await getDoc(collectionRef);
            const updatedUser = {id: userId,...docSnap.data()} ;
            dispatch(updateProfilePic({id:userId,profilePic:data.image}));
            dispatch(setCurrentUser(updatedUser));
        }catch (e) {
            return Promise.reject("Unable to update, status :" + e);
        }
    }
)

export const updateUserDetails = createAsyncThunk(
    "users/updateUserDetails",
    async(data,{dispatch}) =>{

        const userId = data.id;
        const collectionRef = doc(database, "userData", userId );
        try{
            await updateDoc(collectionRef, {
                ...data
            });
            const docSnap = await getDoc(collectionRef);
            const updatedUser = {id: userId,...docSnap.data()} ;
            dispatch(fetchUsers());
            dispatch(setCurrentUser(updatedUser));
        }catch (e) {
            return Promise.reject("Unable to update, status :" + e);
        }
    }
)

const initialState = {
    usersArray: [],
    filteredUsersArray: [],
    isLoading: true,
    errMsg: '',
    actionReturnData: 0
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.usersArray.push(action.payload);
        },
        updateProfilePic: (state, action) => {
            state.usersArray.find((user)=>user.id===action.payload.id).profilePic = action.payload.profilePic;
            return(state);
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
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.usersArray = action.payload;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [addUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
        },
        [addUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Add failed';
        },
        [updateUserProfilePic.pending]: (state, action) => {
            state.isLoading = true;
            state.errMsg = '';
        },
        [updateUserProfilePic.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
        },
        [updateUserProfilePic.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Update failed';
        }
    }
});

export const usersReducers = usersSlice.reducer;
export const { addUser, updateProfilePic, updateRating, getFilteredUsersArray } = usersSlice.actions;

export const selectAllUsers = (state) => {
    return state.users.usersArray;
};
export const selectWorkers = (state) => {
    return state.users.usersArray.filter((user) => user.worker === true);
};
export const selectUserById = (id) => (state) => {
    return state.users.usersArray.find((user) => user.id === id );
};
export const selectUserByEmail = ({ email }) => (state) => {
    return state.users.usersArray.filter((user) => user.email === email);
};
export const selectUserByEmailPassword = ({ email, password }) => (state) => {
    return state.users.usersArray.filter((user) => user.email === email && user.password === password);
};
export const selectUsersByUserIdArray = (userIdArray) => (state) => {
    const usersArray = [];
    state.users.usersArray.map(
        (user) => {
            if (userIdArray.includes(user.id)) usersArray.push(user);
        }
    );
    return usersArray;
};
