import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { DirectMessageType } from '../../@types/directMessageType';
import URLConstants from '../../constants/urlConstants';

type DirectMessage = {
    message: string;
}
type DirectMessageBody = {
    whatsAppBusinessId: string;
    phoneNumberId: string;
    from: string;
    to: string;
    type: string;
    text: string;
}

type DirectMessageState = {
    isLoading: boolean;
    error: boolean;
    directMessage: DirectMessageType;
}

const initialState: DirectMessageState = {
    isLoading: false,
    error: false,
    directMessage: {   } as DirectMessageType
}

const slice = createSlice({
    name: 'directMessage',
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

        // SEND DIRECT  MESSAGE
        directMessageSuccess(state, action) {
            state.isLoading = false;
            state.directMessage = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function  sendDirectMessage(messageObj:DirectMessageBody) {

    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.DIRECT_MESSAGES_BASE_URL, {'whatsAppBusinessId': messageObj.whatsAppBusinessId,"phoneNumberId":messageObj.phoneNumberId, 'from': messageObj.from, 'to': messageObj.to, 'type': messageObj.type,"text":messageObj.text }
            );
            dispatch(slice.actions.directMessageSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}