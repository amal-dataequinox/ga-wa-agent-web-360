import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';
import {recentChatList} from "../../@types/chatList";

type DraftMessage = {
    conversationId : string;
    message : string
}

type AddContactState = {
    isLoading: boolean;
    error: boolean;
    activeUser : string,
    recentChats: recentChatList[] | [];
    tempContact : recentChatList | null;
    activeDraftMessages : DraftMessage[]
}

const initialState: AddContactState = {
    isLoading: false,
    error: false,
    activeUser : '',
    recentChats: [],
    tempContact : null,
    activeDraftMessages : []
}

const slice = createSlice({
    name: 'chatList',
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
        setActiveUser(state,action){
            state.activeUser = action.payload
        },
        // ADD TEMP CONTACT
        setTempContact(state, action) {
            state.tempContact = action.payload;
        },

        setRecentChat(state,action) {
           state.recentChats = action.payload
        },

        setHandleInputChange(state,action){
            state.activeDraftMessages = action.payload
        }
    }
});

// Reducer
export default slice.reducer;


export function addTempContact(values:recentChatList) {
    console.log(values)
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                dispatch(slice.actions.setTempContact(values));
            } catch (error :any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };
    
  }

  export function clearTempContact() {

        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                dispatch(slice.actions.setTempContact(null));
            } catch (error :any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };
    
  }

  export function setActiveUser(activeUser:string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            dispatch(slice.actions.setActiveUser(activeUser));
        } catch (error :any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}

export function getRecentChats(whatsAppBusinessId:string,option:any,status:any,contact:any, tags:any) {
    var params = {
        "page" :1,
        "records" :500
      }
      if(status=="" || status=="ALL"){
          status=null
      }
      if(option=="All"){
        option=""
    }
    if(tags.length==0){
        tags=[]
    }
  
    var body = {
        "whatsAppBusinessId": whatsAppBusinessId,
        "option": option,
        "status":status ,
        "contact": contact,
        "tags": tags
    }
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.CHAT_LIST_BASE_URL,{
                "whatsAppBusinessId": whatsAppBusinessId,
                "option": option,
                "status":status ,
                "contact": contact,
                "tags": tags
            },{params});
            dispatch(slice.actions.setRecentChat(response.data.data));
        } catch (error :any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}


export function setActiveDraftMessages(draftMessages:string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            dispatch(slice.actions.setHandleInputChange(draftMessages));
        } catch (error :any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}

export function getChatListByTag(tagId:string) {
    var params = {
        "page" :1,
        "count" :100
      }
   
    let tagIds={"tagId":tagId};
    let data=[];
    data.push(tagIds);
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.CHAT_LIST_BY_TAG_BASE_URL,[{"tagId":tagId}],{params});
            dispatch(slice.actions.setRecentChat(response.data.data));
        } catch (error :any) {
            dispatch(slice.actions.hasError(error));
            return {message : error?.message, hasError : true} 
        }
    };

}
//   export function addNewContactFromFile(values:any) {
//     console.log(values.MobileNumber.trim());
    
//     console.log(values.FirstName,values.LastName,values.Email,values.MobileNumber);
//     let contactdetails ={'contactFirstName' :values.FirstName,"contactLastName":values.LastName,"contactEmail": values.Email,"contactPhoneNumber":values.MobileNumber}
//         return async () => {
//             dispatch(slice.actions.startLoading());
//             try {
//                 const response = await axios.post(URLConstants.ADD_CONTACT_BASE_URL,
//                     [contactdetails]);
//                 dispatch(slice.actions.addContactSuccess(response.data.data));
//             } catch (error) {
//                 dispatch(slice.actions.hasError(error));
//             }
//         };
    
//   }