import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';

type AddUserType={
    count:number;
}
type AddContactState = {
    isLoading: boolean;
    error: boolean;
    addUserToTeam: AddUserType;
}

const initialState: AddContactState = {
    isLoading: false,
    error: false,
    addUserToTeam: {
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

        // ADD USER TO TEAM
        addUserToTeamSuccess(state, action) {
            state.isLoading = false;
            state.addUserToTeam = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function addNewUserToTeam(userId: any) {
 let teamId =localStorage.getItem('teamId')
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.post(`https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gaus/team/${teamId}/users`,
                    [{'userId' :userId}],
               );
                dispatch(slice.actions.addUserToTeamSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
    
  }