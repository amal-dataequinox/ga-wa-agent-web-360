import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { AccountStatsType } from '../../@types/accountStatsType';
import URLConstants from '../../constants/urlConstants';


type AccountStatsState = {
    isLoading: boolean;
    error: boolean;
    accountStats: AccountStatsType;
}

const initialState: AccountStatsState = {
    isLoading: false,
    error: false,
    accountStats: {} as AccountStatsType
}

const slice = createSlice({
    name: 'accountStats',
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

        // GET ACCOUNT STATS
        getAccountStatsSuccess(state, action) {
            state.isLoading = false;
            state.accountStats = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAccountStats(from:string,to :string) {
    var params = {
        "from":from,
        "to":to
      }
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.ACCOUNT_STATS_BASE_URL,{params});
                dispatch(slice.actions.getAccountStatsSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}
