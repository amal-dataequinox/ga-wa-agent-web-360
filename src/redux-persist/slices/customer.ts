import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { Customer } from '../../@types/customer';
import URLConstants from '../../constants/urlConstants';


type CustomerState = {
    isLoading: boolean;
    error: boolean;
    customer: Customer;
}

const initialState: CustomerState = {
    isLoading: false,
    error: false,
    customer: {
        "userId": "",
        "firstName": "",
        "lastName": "",
        "userName": "",
        "email": "",
        "contactNumber": "",
        "accountId": "",
        "accountVerified": false,
        "enabled": false,
        "createTime": new Date(),
        "updateTime": new Date(),
        "account": {
            "accountId": "",
            "accountName": "",
            "createTime": new Date(),
            "updateTime": new Date(),
        },

        "userRoles": [{
            "userRoleId": "",
            "userId": "",
            "roleId": 0,
            "role": {
                "roleId": 0,
                "roleName": "",
                "description": "",
                "roleAuthorities": [{
                    "roleAuthorityId": 0,
                    "roleId": 0,
                    "authorityId": 0,
                    "authority": {
                        "authorityId": 0,
                        "authorityName": "",
                        "description": "",
                    },
                }]
            },
        }],


    }
}

const slice = createSlice({
    name: 'customer',
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

        // GET CUSTOMER
        getCustomerSuccess(state, action) {
            state.isLoading = false;
            state.customer = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getCustomer() {
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.USER_BASE_URL);
                dispatch(slice.actions.getCustomerSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}