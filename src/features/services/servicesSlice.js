import { SERVICES } from '../../app/shared/SERVICES';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../firebaseConfig';

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async () => {
        const collectionRef = collection(database, "serviceData");
        const querySnapshot = await getDocs(collectionRef)
        if (querySnapshot.empty || !querySnapshot.size) {
            return Promise.reject('Unable to fetch, status: ' + querySnapshot.status);
        }
        const data = querySnapshot.docs.map((doc) => {
                return { id:doc.id,...doc.data()};
        })
        return data
    }
)

const initialState = {
    servicesArray: [],
    isLoading: true,
    errMsg: ''
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchServices.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchServices.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.servicesArray = action.payload;
        },
        [fetchServices.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const servicesReducer = servicesSlice.reducer;
export const selectAllServices = (state) => {
    return state.services.servicesArray
}
export const selectParentServices = (state) => {
    return state.services.servicesArray.filter(
        (service) => service.parent === "self"
    )
};
export const selectServicesByParent = (parent) => (state) => {
    return state.services.servicesArray.filter(
        (service) => service.parent === parent
    )
}


//local data selectors 

export const selectAllNav = () => {
    return SERVICES;
};

export const selectParentNav = () => {
    return SERVICES.filter((nav) => nav.parent === nav.id);
};

export const selectSubmenu = (id) => {
    return SERVICES.filter((nav) => nav.parent === parseInt(id) && nav.parent !== nav.id);
};

export const selectNavById = (id) => {
    return SERVICES.find((navItem) => navItem.id === parseInt(id));
};

export const selectServiceTitleById = (serviceIds) => (state) => {
    return serviceIds.map((id) => {
        return state.services.servicesArray.find((service)=>service.id===id).title
    })
};

export const searchServicesByTitle = (searchText) =>{
    let matched_services = SERVICES.filter((service)=>service.title.toLowerCase().indexOf(searchText.toLowerCase()) >=0)
    .map((service)=>{
        return(service.id)

    });
    return SERVICES.filter((service)=>{
        return ( matched_services.indexOf(service.id) != -1 ) || (matched_services.indexOf(service.parent) != -1)
    }) 
}
