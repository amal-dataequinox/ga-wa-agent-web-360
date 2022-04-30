import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { ChatMessagesType } from '../../@types/chatMessagesType';
import URLConstants from '../../constants/urlConstants';


type ChatMessagesState = {
    isLoading: boolean;
    error: boolean;
    chatMessages: ChatMessagesType[];
}

const initialState: ChatMessagesState = {
    isLoading: false,
    error: false,
    chatMessages: []
}

const slice = createSlice({
    name: 'chatMessages',
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

        // GET CONVERSATION MESSAGES
        getChatMessagesSuccess(state, action) {
            state.isLoading = false;
            state.chatMessages = action.payload;
        },

        setChatMessage(state,action){
            state.chatMessages = action.payload
        }
    }
});

// Reducer
export default slice.reducer;


export function getChatMessages(conversationId:string,page:number,records:number) {
    var params = {
        "conversationId":conversationId,
        "page":page,
        "records":records
      }
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.CHAT_MESSAGES_BASE_URL,{params});
                dispatch(slice.actions.getChatMessagesSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
  
}

export function setChatMessages(message : ChatMessagesType) {
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                dispatch(slice.actions.setChatMessage(message));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
  
}