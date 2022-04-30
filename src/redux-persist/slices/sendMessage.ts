import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';

type SendMessage = {
    message: string;
}

type SendMessageState = {
    isLoading: boolean;
    error: boolean;
    sendMessage: SendMessage;
}

const initialState: SendMessageState = {
    isLoading: false,
    error: false,
    sendMessage: {
        message: ''
    },
}

const slice = createSlice({
    name: 'sendMessage',
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

        // SEND MESSAGE
        sendMessageSuccess(state, action) {
            state.isLoading = false;
            state.sendMessage = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function sendNewMessage(to: any,from:string, type: string, templateName: any, templateId: any,whatsAppBusinessId:string,phoneNumberId:string, language: any, body: any, header: any) {

    if (Object.keys(header).length === 0) {
        console.log("empty");
        header = null;
    }
    if (Object.keys(body).length === 0) {
        body = null;
    }
    let requestBody = { 'to': to[0].contactPhoneNumber,"from":from, 'type': type, 'templateName': templateName, 'templateId': templateId,"whatsAppBusinessId":whatsAppBusinessId,"phoneNumberId":phoneNumberId, 'language':language ,'body': body, 'header': header,"button": null }

    console.log(requestBody);

    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.SEND_MESSAGE_BASE_URL, { 'to': to[0].contactPhoneNumber,"from":from, 'type': type, 'templateName': templateName, 'templateId': templateId,"whatsAppBusinessId":whatsAppBusinessId,"phoneNumberId":phoneNumberId,'language':language ,'body': body, 'header': header,"button": null }
            );
            dispatch(slice.actions.sendMessageSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}