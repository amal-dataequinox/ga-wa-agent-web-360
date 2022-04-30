import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { UpdateConversationType } from '../../@types/updateConversationType';
import URLConstants from '../../constants/urlConstants';


type UpdateConversationState = {
    isLoading: boolean;
    error: boolean;
    updateConversation: UpdateConversationType;
}

const initialState: UpdateConversationState = {
    isLoading: false,
    error: false,
    updateConversation: { } as UpdateConversationType
}

const slice = createSlice({
    name: 'updateConversation',
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

        // UPDATE CONVERSATION
        updateConversationSuccess(state, action) {
            state.isLoading = false;
            state.updateConversation = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function  updateConversationAssign(conversationId:string,userId:string,userName:string) {
    var params = {
        "assignedAgentId":userId,
        "assignedAgentName":userName
      }
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gcns/conversation/${conversationId}/agent`,
            {
                "assignedAgentId":userId,
                "assignedAgentName":userName }
            );
            dispatch(slice.actions.updateConversationSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}