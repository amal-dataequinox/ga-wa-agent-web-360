import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';
import { ConversationTagsType,AllTagsType } from '../../@types/conversationTagsType';


type ConversationTagsState = {
    isLoading: boolean;
    error: boolean;
    conversationTag: ConversationTagsType[];
    allTags: AllTagsType[];
    addTag :AllTagsType;
    assignTag:AllTagsType;
    removeTag:AllTagsType;
}

const initialState: ConversationTagsState = {
    isLoading: false,
    error: false,
    conversationTag: [],
    allTags:[],
    addTag:{} as AllTagsType,
    assignTag:{} as AllTagsType,
    removeTag:{} as AllTagsType,
}

const slice = createSlice({
    name: 'conversationTag',
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

        // GET ALL TAGS OF CONVERSATION
        getConversationTagSuccess(state, action) {
            state.isLoading = false;
            state.conversationTag = action.payload;
        },

        getAllTagsSuccess(state, action) {
            state.isLoading = false;
            state.allTags = action.payload;
        },

        createTagSuccess(state, action) {
            state.isLoading = false;
            state.addTag = action.payload;
        },

        assignTagSuccess(state, action) {
            state.isLoading = false;
            state.assignTag = action.payload;
        },
        removeTagSuccess(state, action) {
            state.isLoading = false;
            state.assignTag = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAllTagsOfAConversation(conversationId:string) {
    var params = {
        "conversationId":conversationId,
      }
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(URLConstants.CONVERSATION_TAGS_BASE_URL,{params});
                dispatch(slice.actions.getConversationTagSuccess(response.data.data));
                return response.data.data;
            } catch (error:any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };
  
}

export function getAllTags() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(URLConstants.All_TAG_BASE_URL);
            dispatch(slice.actions.getAllTagsSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}

export function createTag(tagName:string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.CREATE_TAG_BASE_URL,{"tagName":tagName});
            dispatch(slice.actions.createTagSuccess(response.data.data));
            return response.data.data
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}

export function assignTag(conversationId:string,tagId:string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.ASSIGN_TAG_BASE_URL,{"conversationId":conversationId,"tagId":tagId});
            dispatch(slice.actions.assignTagSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };
}

export function removeTag(conversationId:string,tagId:string) {
    const data = {
        "conversationId":conversationId,
        "conversationTagId":tagId
      }
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(URLConstants.REMOVE_TAG_BASE_URL,{data});
            dispatch(slice.actions.removeTagSuccess(response.data.data));
        } catch (error:any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}