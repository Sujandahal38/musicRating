import { FETCH_USER_REQ, FETCH_USER_SEUCCESS, FETCH_USER_FAILED } from './userType';
import Axios from 'axios';
import { HOST } from '../../host';

export const fetchUserReq = () => {
    return {
        type: FETCH_USER_REQ
    }
}

export const fetchUserSuccess = (data, status) => {
    return {
        type: FETCH_USER_SEUCCESS,
        data: data,
        status: status
    }
}

export const fetchUserFailed = (message,status) => {
    return {
        type: FETCH_USER_FAILED,
        message: message,
        status: status
    }
}

export const FetchUser = () => {
    return (dispatch) => {
        dispatch(fetchUserReq());
        const token = localStorage.getItem('token');
        Axios.defaults.headers.common['Authorization'] = token;
        Axios.get(`${HOST}/userData`).then((res) => {
            console.log(res)
            dispatch(fetchUserSuccess(res.data.userData, res.status ));
        }).catch((err) => {
            dispatch(fetchUserFailed(err.response.data.message, err.response.status))
        })
    }
}