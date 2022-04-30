import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { GetTemplatesType } from '../../@types/getTemplatesType';
import URLConstants from '../../constants/urlConstants';


type GetTemplatesState = {
    isLoading: boolean;
    error: boolean;
    getTemplates: GetTemplatesType[];
}

const initialState: GetTemplatesState = {
    isLoading: false,
    error: false,
    getTemplates: [
        {
            whatsAppBusinessId: '',
            accountId: '',
            displayName: '',
            businessAccountId: '',
            templates: [
                {
                    name: '',
                    language: '',
                    status: '',
                    category: '',
                    id: '',
                    components: [
                        {
                            type: '',
                            format: '',
                            text: '',
                            buttons: [{
                                type: '',
                                text: '',
                                phone_number: '',
                                url: '',
                            }]
                        }
                    ]
                }],
        },
    ]


}

const slice = createSlice({
    name: 'getTemplates',
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

        // GET ALL TEMPLATES
        getTemplatesSuccess(state, action) {
            state.isLoading = false;
            state.getTemplates = action.payload;
        },
    }
});

// Reducer
export default slice.reducer;


export function getAllTemplates() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get(URLConstants.GET_TEMPLATES_BASE_URL,);
            dispatch(slice.actions.getTemplatesSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };

}