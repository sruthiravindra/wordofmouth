import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGet } from '../../utils/axiosConfig';
import { baseUrl } from '../../app/shared/baseUrl';

// ============================ async actions =================================

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async () => {
        try {
            const response = await axiosGet('services');
            return response.data;
        } catch (err) {
            return Promise.reject(err);
        }
    }
);

//effie: what is this for?
// export const searchServicesByTitle = createAsyncThunk(
//     'services/searchServicesByTitle',
//     async(data,{dispatch, getState})=>{
//         dispatch(searchServicesByTitleRed(data));
//     }
// );

// ============================ slice definition =================================

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
                        return ( matched_services.indexOf(service.id) !== -1 ) || (matched_services.indexOf(service.parent) !== -1)
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
            state.errMsg = 'Failed to fetch services :: ' + action.error.message;
        }
    }
});

export const servicesReducer = servicesSlice.reducer;
export const { searchServicesByTitleRed } = servicesSlice.actions;

// ============================ selectors =================================

export const selectAllServices = (state) => { return state.services.servicesArray };

export const selectParentServices = (state) => { return state.services.servicesArray };

export const selectServicesByParent = (parent) => (state) => {
    return state.services.servicesArray.filter(
        (service) => service._id === parent
    )[0].sub_service;
};

export const selectServiceTitleById = (serviceIds) => (state) => {
    // no services set for the user
    if(!serviceIds){
        const response = new Array();
        return response;
    }
    // since the services are in a hierarchical structure and a worker can choose from either parent or subservice
    // we need to check both levels and pick the service titles
    let result = state.services.servicesArray.reduce((acc,value)=>{
        let item = [];
        // case: its in the parent 
        if(serviceIds.indexOf(value._id)>=0)item.push(value.title);
        else{ // checking if sub service selected
            value.sub_service.forEach(element => {
                if(serviceIds.indexOf(element._id)>=0){
                    item.push(element.title);
                }
            });
        }
        //push the item in acc(accumulator) if it is not null
        if (item && item.length > 0) {
            acc.push(item);
        }
        return acc;
    },[]);
    return result.flat();
};

export const selectServiceIdByTitle = (serviceTitle) => (state) => {
    let foundService = null;
    for (const service of state.services.servicesArray) {
        if (service.title === serviceTitle) {
            foundService = service;
            break;
        }
        foundService = service.sub_service.find(sub_service => sub_service.title === serviceTitle );
        if (foundService) {
            break;
        }
    }
    if (foundService) {
        return foundService._id
    } else {
        return 'Unable to find service'
    }
}