import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { fromNumberType } from '../../@types/fromNumberType';
import URLConstants from '../../constants/urlConstants';


type FromNumberState = {
    isLoading: boolean;
    error: boolean;
    fromNumber: fromNumberType[];
}

const initialState: FromNumberState = {
    isLoading: false,
    error: false,
    fromNumber: [{
        "whatsAppBusinessNumberId": "",
        "businessAccountId": "",
        "displayPhoneNumber": "",
        "phoneNumberId": "",
        "createTime": new Date(),
        "updateTime": new Date(),
    }]
}

const slice = createSlice({
    name: 'fromNumber',
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

        // GET FROM NUMBER DATA
        getFromNumberSuccess(state, action) {
            state.isLoading = false;
            state.fromNumber = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getFromNumber(whatsAppBusinessId:string) {
        return async () => {
            dispatch(slice.actions.startLoading());
            try {
                const response = await axios.get(`https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gaus/whatsapp-business/${whatsAppBusinessId}/numbers`);
                dispatch(slice.actions.getFromNumberSuccess(response.data.data));
            } catch (error) {
                dispatch(slice.actions.hasError(error));
            }
        };
}