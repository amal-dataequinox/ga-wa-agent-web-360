import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import URLConstants from '../../constants/urlConstants';
import { FileUploadType } from '../../@types/fileUploadType';


type TemplateMediaValue={
    whatsAppBusinessId: string,
    fileName: string,
    publicUrl: string,
}

type MediaSaveState = {
    isLoading: boolean;
    error: boolean;
    fileUpload: FileUploadType;
}

const initialState: MediaSaveState = {
    isLoading: false,
    error: false,
    fileUpload: {} as FileUploadType
}

const slice = createSlice({
    name: 'fileUpload',
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

        // UPLOAD MEDIA FILE
        fileUploadSuccess(state, action) {
            state.isLoading = false;
            state.fileUpload = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function fileUploadToS3(whatsAppBusinessId: string, fileName: any) {

    const formData = new FormData();
    formData.append('file',fileName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      params:{ 'whatsAppBusinessId': whatsAppBusinessId }
    }
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post(URLConstants.UPLOAD_FILE_BASE_URL, formData,config);
            dispatch(slice.actions.fileUploadSuccess(response.data.data));
            return response.data.data
        } catch (error: any) {
            dispatch(slice.actions.hasError(error));
            return { message: error?.message, hasError: true }
        }
    };
    
  }