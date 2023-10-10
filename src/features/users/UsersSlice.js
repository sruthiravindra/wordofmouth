import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { searchServicesByTitle } from '../services/servicesSlice';
import { setCurrentUser } from '../user/userSlice';
import { functions } from '../../firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { axiosGet, axiosPost, axiosPut } from '../../utils/axiosConfig';
import { baseUrl } from '../../app/shared/baseUrl';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axiosGet('users');
        return response;
    }
)

export const fetchWorkersByServiceId = createAsyncThunk(
    "users/fetchWorkers",
    async(serviceId, {dispatch})=>{
        try{
            const response = await axiosGet(`workers/${serviceId}`);
            console.log("profiles", response.profiles);
            return response.profiles;
        }catch(e){
            return Promise.reject("Unable to fetch workers");
        }
    }
)


export const updateUserProfilePic = createAsyncThunk(
    "users/updateUserProfilePic",
    async(data, {dispatch}) => {
        try{
            console.log('update user profile pic thunk called')
            console.log(data.image)
            const uploadProfilePic = httpsCallable(functions, 'uploadProfilePic');
            const response = await uploadProfilePic(data);
            console.log(response);
            dispatch(setCurrentUser(response.data.user));
        } catch (e) {
            return Promise.reject("Unable to update, status :" + e);
        }
    }
)

export const updateUserDetails = createAsyncThunk('users/updateUserDetails', 
    async (data, {dispatch}) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const response = await fetch(
        baseUrl + 'profiles/' + data.currentUserId,
        {
            method: 'PUT',
            headers: {
                Authorization: bearer,
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(data.profile)
        }
    );

    if (!response.ok) {
        return Promise.reject(
            'Error updating profile' +
                response.status
        );
    }
    const returnval = await response.json();
    await dispatch(setCurrentUser(returnval));

    return returnval;
});

const initialState = {
    usersArray: [],
    workerSearchArray: [],
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
        // getFilteredUsersArray: (state, action) => {
        //     let services = action.payload;
        //     return (
        //         {
        //             ...state,
        //             filteredUsersArray: state.usersArray.map((user) => {
        //                 return (
        //                     {
        //                         ...user,
        //                         isMatch: user.services.some(item => services.includes(item))
        //                     }
        //                 )
        //             }).filter((user) => user.isMatch === true)
        //         }

        //     )
        // },
        updateRating: (state, action) => {}
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

        [fetchWorkersByServiceId.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchWorkersByServiceId.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.workerSearchArray = action.payload;
        },
        [fetchWorkersByServiceId.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
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
export const { addUser, updateProfilePic, updateRating, setWorkerSearchArray } = usersSlice.actions;

export const selectAllUsers = (state) => {
    return state.users.usersArray;
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


// export const addUsers = createAsyncThunk(
//     'users/addUsers',
//     async (user, { dispatch }) => {
//         const collectionRef = collection(database, "userData");
//         let newUser = {
//             "firstName": user.firstName,
//             "lastName": user.lastName,
//             "email": user.email,
//             "profilePic": user.profilePic,
//             "worker": false,
//             "services":[],
//             "contacts":[],
//             "contactRequests": []
//         };
//         console.log(newUser);

//         try {
//             const querySnapshot = await addDoc(collectionRef, newUser);
//             dispatch(addUser({id:querySnapshot.id,...newUser}));
//             dispatch(setCurrentUser({id:querySnapshot.id,...newUser}));
//         } catch (e) {
//             return Promise.reject("Unable to create, status :" + e);
//         }
//     }
// )

// export const updateUserProfilePic = createAsyncThunk(
//     'users/updateUserProfilePic',
//     async(data,{dispatch})=>{

//         const userId = data.id;
//         const collectionRef = doc(database, "userData", userId );
//         try{
//             await updateDoc(collectionRef, {
//                 profilePic: data.image
//             });
            
//             const docSnap = await getDoc(collectionRef);
//             const updatedUser = {id: userId,...docSnap.data()} ;
//             dispatch(updateProfilePic({id:userId,profilePic:data.image}));
//             dispatch(setCurrentUser(updatedUser));
//         }catch (e) {
//             return Promise.reject("Unable to update, status :" + e);
//         }
//     }
// )
