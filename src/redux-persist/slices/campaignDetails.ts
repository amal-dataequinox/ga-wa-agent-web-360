import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { CampaignDetailsType } from '../../@types/campaignDetailsType';
import URLConstants from '../../constants/urlConstants';


type CampaignDetailsState = {
    isLoading: boolean;
    error: boolean;
    campaignDetails: CampaignDetailsType;
}

const initialState: CampaignDetailsState = {
    isLoading: false,
    error: false,
    campaignDetails: {} as CampaignDetailsType
}

const slice = createSlice({
    name: 'campaignDetails',
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

        // GET CAMPAIGN DETAILS
        getcampaignDetailsSuccess(state, action) {
            state.isLoading = false;
            state.campaignDetails = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getCampaignDetails(campaignId:string) {
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(`
                https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gabs/whatsapp/campaign/${campaignId}`);
                dispatch(slice.actions.getcampaignDetailsSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}
