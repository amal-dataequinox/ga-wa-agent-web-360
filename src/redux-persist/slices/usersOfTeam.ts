import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { AllUser } from '../../@types/allUser';
import URLConstants from '../../constants/urlConstants';


type UsersOfTeamState = {
    isLoading: boolean;
    error: boolean;
    usersOfTeam: AllUser[];
}

const initialState: UsersOfTeamState = {
    isLoading: false,
    error: false,
    usersOfTeam: [{
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


    }]
}

const slice = createSlice({
    name: 'usersOfTeam',
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

        // GET ALL USER OF ATEAM
        getUserOFTeamSuccess(state, action) {
            state.isLoading = false;
            state.usersOfTeam = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAllUserOfATeam(teamId : string) {
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(`https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gaus/team/${teamId}/users`);
                dispatch(slice.actions.getUserOFTeamSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
  
}