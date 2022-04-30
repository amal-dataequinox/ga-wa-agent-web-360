import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    API_FAILED
} from './constants';


export const loginUser = (username: any, password: any, history: any) => ({
    type: LOGIN_USER,
    payload: { username, password, history }
});

export const loginUserSuccess = (user: any) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});

export const registerUser = (user: any) => ({
    type: REGISTER_USER,
    payload: { user }
});

export const registerUserSuccess = (user: any) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
});

export const logoutUser = (history: any) => ({
    type: LOGOUT_USER,
    payload: { history }
});

export const forgetPassword = (email: any) => ({
    type: FORGET_PASSWORD,
    payload: { email }
});

export const forgetPasswordSuccess = (passwordResetStatus: string) => ({
    type: FORGET_PASSWORD_SUCCESS,
    payload: passwordResetStatus
});

export const apiError = (error: unknown) => ({
    type: API_FAILED,
    payload: error
});