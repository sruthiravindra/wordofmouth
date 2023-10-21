import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet, axiosPost } from '../../utils/axiosConfig';

// ============================ async actions =================================


export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (userId) => {
        const response = await axiosGet(`profiles/${userId}`);
        if (response.status >= 200 && response.status < 300) { return response.data }
        return Promise.reject(response.data.message);
    }
);

export const fetchWorkersByServiceId = createAsyncThunk(
    "users/fetchWorkersByServiceId",
    async(serviceId) => {
        const response = await axiosGet(`workers/${serviceId}`);
        if (response.status >= 200 && response.status < 300) { return response.data.profiles }
        return Promise.reject(response.data.message);
    }
)

export const fetchWorkersByKeyword = createAsyncThunk(
    "users/fetchWorkersByKeyword",
    async(keyword) => {
        if (!keyword) { return [] }
        const servicesResponse = await axiosGet(`services/search/${keyword}`);
        if (servicesResponse.status >= 200 && servicesResponse.status < 300) { 
            const response = await axiosPost(`workers/search/${keyword}`, servicesResponse.data.serviceIds);
            if (response.status >= 200 && response.status < 300) { return response.data.profiles }
            return Promise.reject(response.data.message);
        }
    }
);

// ============================ slice definition =================================

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
    reducers: {},
    extraReducers: {
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
            state.errMsg = 'Failed to fetch workers:: ' + action.payload
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
            state.errMsg = 'Failed to fetch workers:: ' + action.payload
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
