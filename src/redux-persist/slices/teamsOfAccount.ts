import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { TeamsOfAccount } from '../../@types/teamsOfAccount';
import URLConstants from '../../constants/urlConstants';


type TeamsOfAccountState = {
    isLoading: boolean;
    error: boolean;
    teamsOfAccount: TeamsOfAccount[];
}

const initialState: TeamsOfAccountState = {
    isLoading: false,
    error: false,
    teamsOfAccount: [{
        teamId: '',
        teamName: '',
        accountId: '',
        createTime: new Date(),
        updateTime: new Date(),
    }]

}

const slice = createSlice({
    name: 'teamsOfAccount',
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

        // GET ALL TEAMS
        getTeamsOfAccountSuccess(state, action) {
            state.isLoading = false;
            state.teamsOfAccount = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAllTeam() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(URLConstants.TEAMS_OF_ACCOUNT_BASE_URL,);
            dispatch(slice.actions.getTeamsOfAccountSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };

}