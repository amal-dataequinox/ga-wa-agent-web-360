import { createSlice } from '@reduxjs/toolkit';
import { AllContacts } from '../../@types/allContacts';
import { FileUploadData } from '../../components/Campaigns/AddCampaign/AddContacts';
import { dispatch } from '../store';


export type CampaignType = {
    campaignName: string;
    scheduleTime: string;
    templateName: string;
   // templateId: string;
    language : string;
    toContacts: Array<string> | null;
    from: string;
    whatsAppBusinessId: string;
    phoneNumberId: string
    variables: any;
};

type CampaignState = {
    isLoading: boolean;
    error: boolean;
    campaignData: CampaignType;
}

const initialState: CampaignState = {
    isLoading: false,
    error: false,
    campaignData: {} as CampaignType
}

const slice = createSlice({
    name: 'campaignData',
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

        // GET CAMPAIGN
        getCampaignDataSuccess(state, action) {
            state.isLoading = false;
            state.campaignData = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getCampaignName(values: any) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = {
                "campaignName": values.campaignName, "scheduleTime": values.scheduleTime,"templateName": values.templateName,"language" : values.language, "toContacts": values.toContacts,
                "from": values.from, "whatsAppBusinessId": values.whatsAppBusinessId, "phoneNumberId": values.phoneNumberId, "variables": values.variables
            };
            dispatch(slice.actions.getCampaignDataSuccess(response));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };

}