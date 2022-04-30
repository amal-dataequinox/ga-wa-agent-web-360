import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { CreateWBAccount, TeamID } from '../../@types/createWBAccount';
import URLConstants from '../../constants/urlConstants';


type GetWBAccountState = {
    isLoading: boolean;
    error: boolean;
    getWBAccount: CreateWBAccount[];
}

const initialState: GetWBAccountState = {
    isLoading: false,
    error: false,
    getWBAccount: [{
        'whatsAppBusinessId': '',
        'accountId': '',
        'displayName': '',
        'businessAccountId': '',
        'apiKey': '',
        'status': '',
        'createTime': new Date(),
        'updateTime': new Date(),
        'teams': [{
            'whatsAppBusinessTeamId': '',
            'whatsAppBusinessId': '',
            'teamId': '',
            'team': {
                'teamId': '',
                'teamName': '',
                'accountId': '',
                'createTime': new Date(),
                'updateTime': new Date(),
            }
        }]
    }]
}

const slice = createSlice({
    name: 'getWBAccount',
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

        // GET  WB ACCOUNT
        getWBAccountSuccess(state, action) {
            state.isLoading = false;
            state.getWBAccount = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAllWBAccount() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(URLConstants.GET_WB_ACCOUNT_BASE_URL);
            dispatch(slice.actions.getWBAccountSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}