import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { CreateUser } from '../../@types/createUser';
import URLConstants from '../../constants/urlConstants';


type CreateUserState = {
    isLoading: boolean;
    error: boolean;
    createUser: CreateUser;
}

const initialState: CreateUserState = {
    isLoading: false,
    error: false,
    createUser: {
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
    name: 'createUser',
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

        // CREATE USER
        createUserSuccess(state, action) {
            state.isLoading = false;
            state.createUser = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function createNewUser(
    firstName: string, 
    lastName: string, 
    userName: string,  
    password: string, 
    email: string | null,
    contactNumber :string | null,
    role: string,) {
    const user = localStorage.getItem('authUser');
    if( email==""){
        email=null;
      }
      if(contactNumber==""){
        contactNumber=null;
      }
  
      
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.post(URLConstants.CREATE_USER_BASE_URL,
                    {firstName,lastName,userName,password,email,contactNumber,role}
                   
                );
                dispatch(slice.actions.createUserSuccess(response.data.data));
            } catch (error :any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };

   
}