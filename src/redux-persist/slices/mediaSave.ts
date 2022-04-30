import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';
import { MediaSaveType } from '../../@types/mediaSaveType';


type TemplateMediaValue={
    whatsAppBusinessId: string,
    fileName: string,
    publicUrl: string,
}

type MediaSaveState = {
    isLoading: boolean;
    error: boolean;
    mediaSave: MediaSaveType;
}

const initialState: MediaSaveState = {
    isLoading: false,
    error: false,
    mediaSave: {} as MediaSaveType
}

const slice = createSlice({
    name: 'mediaSave',
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

        // SAVE MEDIA FILE
        mediaSaveSuccess(state, action) {
            state.isLoading = false;
            state.mediaSave = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function mediaFileSave(whatsAppBusinessId:string,fileName:any,publicUrl:any) {
    
    let values ={'whatsAppBusinessId' :whatsAppBusinessId,"fileName":fileName,"publicUrl": publicUrl}
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.post(URLConstants.SAVE_MEDIA_BASE_URL,
                    {'whatsAppBusinessId' :whatsAppBusinessId,"fileName":fileName,"publicUrl": publicUrl});
                dispatch(slice.actions.mediaSaveSuccess(response.data.data));
            } catch (error :any) {
                dispatch(slice.actions.hasError(error));
                return {message : error?.message, hasError : true} 
            }
        };
    
  }