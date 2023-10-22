import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost, axiosPut } from '../../utils/axiosConfig';

// ============================ async actions =================================

//rename to fetchWorkerProfile
export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (profileId) => {
        try {
            const response = await axiosGet(`profiles/${profileId}`);
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export const updateWorkerProfile = createAsyncThunk(
    'users/updateWorkerProfile',
    async ({ profileId, profile }) => {
        try {
            const response = await axiosPut(`profiles/${profileId}`, profile);
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

export const fetchWorkersByServiceId = createAsyncThunk(
    "users/fetchWorkersByServiceId",
    async(serviceId) => {
        try {
            const response = await axiosGet(`workers/${serviceId}`);
            return response.data.profiles;
        } catch (err) {
            return Promise.reject(err);
        }
    }
)

export const fetchWorkersByKeyword = createAsyncThunk(
    "users/fetchWorkersByKeyword",
    async(keyword) => {
        try {
            if (!keyword) { return [] }
            const servicesResponse = await axiosGet(`services/search/${keyword}`);
            const response = await axiosPost(`workers/search/${keyword}`, servicesResponse.data.serviceIds);
            return response.data.profiles;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

// ============================ slice definition =================================

const initialState = {
    workerProfile: null,
    workerSearchArray: [],
    isLoading: true,
    errMsg: '',
    actionReturnData: 0
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.workerProfile = action.payload.profile;
        },
        [fetchUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to fetch worker :: ' + action.error.message;
        },
        [updateWorkerProfile.pending]: (state) => {
            state.isLoading = true;
        },
        [updateWorkerProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.workerProfile = action.payload.profile;
        },
        [updateWorkerProfile.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to update worker profile :: ' + action.error.message;
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
            state.errMsg = 'Failed to fetch workers:: ' + action.error.message;
        },
        [fetchWorkersByKeyword.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchWorkersByKeyword.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.workerSearchArray = action.payload;
        },
        [fetchWorkersByKeyword.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = 'Failed to fetch workers:: ' + action.error.message;
        }
    }
});

export const usersReducers = usersSlice.reducer;


//OLD FIREBASE CODE

// import { getDoc, doc, updateDoc } from 'firebase/firestore';
// import { database } from '../../firebaseConfig';

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
