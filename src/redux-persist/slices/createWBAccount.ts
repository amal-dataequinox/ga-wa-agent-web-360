import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { CreateWBAccount, TeamID } from '../../@types/createWBAccount';
import URLConstants from '../../constants/urlConstants';


type CreateWBAccountState = {
    isLoading: boolean;
    error: boolean;
    createWBAccount: CreateWBAccount;
}

const initialState: CreateWBAccountState = {
    isLoading: false,
    error: false,
    createWBAccount: {
        whatsAppBusinessId: '',
        accountId: '',
        displayName: '',
        businessAccountId: '',
        apiKey: '',
        status: '',
        createTime: new Date(),
        updateTime: new Date(),
        teams: [{
            whatsAppBusinessTeamId: '',
            whatsAppBusinessId: '',
            teamId: '',
            team: {
                teamId: '',
                teamName: '',
                accountId: '',
                createTime: new Date(),
                updateTime: new Date(),
            }
        }]
    }
}

const slice = createSlice({
    name: 'createWBAccountState',
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

        // CREATE WB ACCOUNT
        createWBAccountSuccess(state, action) {
            state.isLoading = false;
            state.createWBAccount = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function createNewWBAccount(values:any) {
    let teamTemp = values.teams.map((data: any) => 
    {
         return { teamId: data.teamId }
  } );
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.CREATE_WB_ACCOUNT_BASE_URL,{"displayName":values.displayName,'businessAccountId':values.whatsappBusinessAccountId,'apiKey':values.serverKey,'teams':teamTemp});
            dispatch(slice.actions.createWBAccountSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}