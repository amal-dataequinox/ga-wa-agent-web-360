import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { AllContacts } from '../../@types/allContacts';
import URLConstants from '../../constants/urlConstants';

export type CampaignListType = {
      campaignId: string;
        scheduleTime: Date;
        campaignName:string;
        status:string;
}

type CampaignListState = {
    isLoading: boolean;
    error: boolean;
    campaignList: CampaignListType[];
}

const initialState: CampaignListState = {
    isLoading: false,
    error: false,
    campaignList: []
}

const slice = createSlice({
    name: 'campaignList',
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

        // GET ALL CAMPAIGNS
        getCampaignListSuccess(state, action) {
            state.isLoading = false;
            state.campaignList = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getCampaignList(page:number,records:number) {
    var params = {
        "page":page,
        "records":records
      }
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.ALL_CAMPAIGN_BASE_URL,{params});
                dispatch(slice.actions.getCampaignListSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}

