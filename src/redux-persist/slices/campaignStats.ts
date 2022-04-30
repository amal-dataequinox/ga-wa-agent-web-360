import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { CampaignStatsType } from '../../@types/campaignStatsType';


type CampaignStatsState = {
    isLoading: boolean;
    error: boolean;
    campaignStats: CampaignStatsType;
}

const initialState: CampaignStatsState = {
    isLoading: false,
    error: false,
    campaignStats: {} as CampaignStatsType
}

const slice = createSlice({
    name: 'campaignStats',
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

        // GET CAMPAIGN STATS
        getCampaignStatsSuccess(state, action) {
            state.isLoading = false;
            state.campaignStats = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getCampaignStats(campaignId:string) {
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(`https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gaas/campaigns/${campaignId}/stats`);
                dispatch(slice.actions.getCampaignStatsSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}
