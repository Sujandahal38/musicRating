import { SIGNUP_REQ, SIGNUP_SUCCESS, SIGNUP_FAILED, CHECK_USERNAME_REQ, CHECK_USERNAME_SUCCESS, CHECK_USERNAME_FAILED } from './signupTypes';
import Axios from 'axios';
import { HOST } from '../../host';
import { showSnackbar } from '../globalSnackBar/snackAction';
 export const signupReq = () =>{
    return {
        type: SIGNUP_REQ,
    }
}

export const signupSuccess = (message, status) =>{
    return {
        type: SIGNUP_SUCCESS,
        message: message,
        status: status,
    }
}

export const signupFailed = (message, status) => {
    return {
        type: SIGNUP_FAILED,
        message: message,
        status: status
    }
}
export const checkUsernameReq = (message, status) => {
    return {
        type: CHECK_USERNAME_REQ,
        message: message,
        status: status,
    }
}

export const checkUsernameSuccess = (message, status) => {
    return {
        type: CHECK_USERNAME_SUCCESS,
        message: message,
        status: status
    }
}

export const checkUsernameFailed = (message, status) => {
    return {
        type: CHECK_USERNAME_FAILED,
        message: message,
        status: status
    }
}


export const setSignupRequest = (data) => {
    return (dispatch) => {
        dispatch(signupReq());
        Axios.post(`${HOST}/signup`, data).then(res => {
            dispatch(signupSuccess(res.data.message, res.status));
            dispatch(showSnackbar(res.data.message, res.status))
        }).catch((err) => {
            dispatch(signupFailed(err.response.data.message, err.response.status));
            dispatch(showSnackbar(err.response.data.message, err.response.status));
        })
    }
}

export const setCheckUsername = (username) => {
    return (dispatch) => {
        dispatch(checkUsernameReq());
        Axios.post(`${HOST}/checkusername`, {username}).then((res) => {
            dispatch(checkUsernameSuccess(res.data.message, res.status));
            dispatch(showSnackbar(res.data.message, res.status));
        }).catch((err) => {
            if (err?.response?.data) {
                dispatch(showSnackbar(err.response.data.message, err.response.status))
            }
        })
    }
}