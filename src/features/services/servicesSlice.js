import { SERVICES } from '../../app/shared/SERVICES';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async () => {
        const response = await fetch(baseUrl+'services');
        if(!response.ok){
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
)
export const searchServicesByTitle = createAsyncThunk(
    'services/searchServicesByTitle',
    async(data,{dispatch, getState})=>{
        dispatch(searchServicesByTitleRed(data));
    }
)

const initialState = {
    servicesArray: [],
    servicesByTitleArray: [],
    isLoading: true,
    errMsg: ''
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        searchServicesByTitleRed:(state,action)=>{
            const searchText = action.payload;
            let matched_services = state.servicesArray.filter((service)=>service.title.toLowerCase().indexOf(searchText.toLowerCase()) >=0)
            .map((service)=>{
                return(service.id)
        
            });
            return (
                {
                    ...state,
                    servicesByTitleArray: state.servicesArray.filter((service)=>{
                        return ( matched_services.indexOf(service.id) != -1 ) || (matched_services.indexOf(service.parent) != -1)
                    })
                }

            )
        }
    },
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
        },
        [searchServicesByTitle.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
        }
    }
});

export const servicesReducer = servicesSlice.reducer;
export const { searchServicesByTitleRed } = servicesSlice.actions;
export const selectAllServices = (state) => {
    return state.services.servicesArray
}
export const selectParentServices = (state) => {
    return state.services.servicesArray;
};
export const selectServicesByParent = (parent) => (state) => {
    return state.services.servicesArray.filter(
        (service) => service._id === parent
    )[0].sub_service;
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
        return state.services.servicesArray.find((service)=>service._id===id).title
    })
};