import {COMMENT_REQ, COMMENT_SUCCESS, COMMENT_FAILED } from './commentTypes';
import Axios from 'axios';
import { HOST } from '../../host';
export const commentReq = () => {
    return {
        type: COMMENT_REQ,
    }
}

export const commentSuccess = (message, status) => {
    return {
        type: COMMENT_SUCCESS,
        message: message,
        status: status
    }
}

export const commentFailed = (message, status) => {
    return {
        type: COMMENT_FAILED,
        message: message,
        status: status
    }
}

export const addComment = (id,comment) => {
    return (dispatch) => {
        dispatch(commentReq());
        Axios.post(`${HOST}/addComment`, {id, comment}).then((res) => {
            dispatch(commentSuccess(res.data.message, res.status));
        }).catch((err) => {
            if (err && err.response) {
                dispatch(commentFailed(err.response.data.message, err.response.status));
            }
        })
    }
}