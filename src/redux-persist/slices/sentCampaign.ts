import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';
import { SentCampaignType } from '../../@types/sentCampaignType';


type SendMessageState = {
    isLoading: boolean;
    error: boolean;
    sendCampaign: SentCampaignType;
}

const initialState: SendMessageState = {
    isLoading: false,
    error: false,
    sendCampaign: { } as SentCampaignType
}

const slice = createSlice({
    name: 'sendCampaign',
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

        // SEND CAMPAIGN
        sendCampaignSuccess(state, action) {
            state.isLoading = false;
            state.sendCampaign = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function sendNewCampaign(values:any, header:any, body:any) {
    if (Object.keys(header).length === 0) {
        header = null;
    }
    if (Object.keys(body).length === 0) {
        body = null;
    }

 let messages=   []
        values.toContacts.map(contacts =>
            messages.push(  { 
                "whatsAppBusinessId": values.whatsAppBusinessId,
                "phoneNumberId": values.phoneNumberId,
                "from": values.from,
                "to": contacts,
                "type": "template",
                "templateName": values.templateName,
                "templateId": values.templateId,
                "language": values.language,
                "header" :header,
                "body":body,
                "button": null
            } )   
        )
    
   // let body = {"campaignName":values.campaignName,"scheduleTime" : values.scheduleTime,"whatsAppBusinessId":values.whatsAppBusinessId, "phoneNumberId" : values.phoneNumberId,"messages" : messages
//}



    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.SEND_CAMPAIGN_BASE_URL, {"campaignName":values.campaignName,"scheduleTime" : values.scheduleTime,"whatsAppBusinessId":values.whatsAppBusinessId, "phoneNumberId" : values.phoneNumberId,"messages" : messages
        }
            );
            dispatch(slice.actions.sendCampaignSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}