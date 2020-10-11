import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VERIFICATION_REQUEST,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILED,
  LOGOUT,
} from './authTypes';
import Axios from 'axios';
import { HOST } from '../../host';
import { showSnackbar } from '../globalSnackBar/snackAction';
import { FetchUser } from '../user/userAction';
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (data, message, status) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
    message: message,
    status: status,
  };
};

export const loginFailed = (error, status) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
    status: status,
  };
};

export const verifyTokenReq = () => {
  return {
    type: VERIFICATION_REQUEST,
  };
};

export const verificationSuccess = (message, status) => {
  return {
    type: VERIFICATION_SUCCESS,
    message: message,
    status: status,
  };
};

export const verificationFailed = (message, status) => {
  return {
    type: VERIFICATION_FAILED,
    message: message,
    status: status,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(loginRequest());
    Axios.post(`${HOST}/login`, data)
      .then((res) => {
        dispatch(loginSuccess(res.data.userData, res.data.message, res.status));
        dispatch(showSnackbar(res.data.message, res.status));
        let token = `bearer ${res.data.token}`;
        localStorage.setItem('token', token);

        dispatch(FetchUser(token));
      })
      .catch((err) => {
        dispatch(loginFailed(err.response.data.message, err.response.status));
        dispatch(showSnackbar(err.response.data.message, err.response.status));
      });
  };
};

export const verifyToken = (token) => {
  return (dispatch) => {
    dispatch(verifyTokenReq());
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.get(`${HOST}/verifytoken`)
      .then((res) => {
        dispatch(verificationSuccess(res.data.message, res.status));
        dispatch(FetchUser(token));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          verificationSuccess(err.response.data.message, err.response.status),
        );
        localStorage.removeItem('token');
      });
  };
};

export const getLogout = () => {
  return (dispatch) => {
    dispatch(logout());
    localStorage.removeItem('token');
  };
};
