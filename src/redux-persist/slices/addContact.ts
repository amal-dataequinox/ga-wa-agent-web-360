import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';

type AddContactResponse={
    count:number;
}

type AddContactValues={
    contactFirstName: string,
    contactLastName: string,
    contactEmail: string,
    contactPhoneNumber: string,
}


type FileUploadData = {
    FirstName: string;
    LastName: string;
    Email: string;
    MobileNumber: string;
};
type AddContactState = {
    isLoading: boolean;
    error: boolean;
    addContact: AddContactResponse;
}

const initialState: AddContactState = {
    isLoading: false,
    error: false,
    addContact: {
        count:0
    },
}

const slice = createSlice({
    name: 'addContact',
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

        // ADD CONTACT
        addContactSuccess(state, action) {
            state.isLoading = false;
            state.addContact = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function addNewContact(values:AddContactValues) {
    console.log(values);
    
    let contactdetails ={'contactFirstName' :values.contactFirstName,"contactLastName":values.contactLastName,"contactEmail": values.contactEmail,"contactPhoneNumber":values.contactPhoneNumber}
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.post(URLConstants.ADD_CONTACT_BASE_URL,
                    [contactdetails]);
                dispatch(slice.actions.addContactSuccess(response.data.data));
            } catch (error :any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };
    
  }

  export function addNewContactFromFile(values:any) {
    
    let contactdetails ={'contactFirstName' :values.FirstName,"contactLastName":values.LastName,"contactEmail": values.Email,"contactPhoneNumber":values.MobileNumber}
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.post(URLConstants.ADD_CONTACT_BASE_URL,
                    [contactdetails]);
                dispatch(slice.actions.addContactSuccess(response.data.data));
            } catch (error:any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };
    
  }