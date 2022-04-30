import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { AllContacts } from '../../@types/allContacts';
import URLConstants from '../../constants/urlConstants';


type AllContactsState = {
    isLoading: boolean;
    error: boolean;
    allContacts: AllContacts[];
}

const initialState: AllContactsState = {
    isLoading: false,
    error: false,
    allContacts: [{
        "contactId": "",
        "contactFirstName": "",
        "contactLastName": "",
        "contactEmail": "",
        "contactPhoneNumber": "",
        "accountId": "",
        "createTime": new Date(),
        "updateTime": new Date(),
    }]
}

const slice = createSlice({
    name: 'allContacts',
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // GET ALL CONTACTS
        getAllContactsSuccess(state, action) {
            state.isLoading = false;
            state.allContacts = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAllContacts(page:number) {
    var params = {
        "page":page,
      }
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.ALL_CONTACTS_BASE_URL,{params});
                dispatch(slice.actions.getAllContactsSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}

export function searchContacts(searchTerm:string,page:number,count:number) {
    var params = {
        "searchTerm":searchTerm,
        "page":page,
        "count":count
      }
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.SEARCH_CONTACTS_BASE_URL,{params});
                dispatch(slice.actions.getAllContactsSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}