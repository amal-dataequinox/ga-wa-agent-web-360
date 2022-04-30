import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { CreateTeam } from '../../@types/createTeam';
import URLConstants from '../../constants/urlConstants';


type CreateUserState = {
    isLoading: boolean;
    error: boolean;
    createTeam: CreateTeam;
}

const initialState: CreateUserState = {
    isLoading: false,
    error: false,
    createTeam: {
        teamId: '',
        teamName: '',
        accountId: '',
        createTime: new Date(),
        updateTime: new Date(),
    }
}

const slice = createSlice({
    name: 'createTeam',
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

        // CREATE TEAM
        createTeamSuccess(state, action) {
            state.isLoading = false;
            state.createTeam = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function createNewTeam(values:any) {
    console.log(values);
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.CREATE_TEAM_BASE_URL,{"teamName":values.teamName});
            dispatch(slice.actions.createTeamSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}