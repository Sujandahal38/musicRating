import {
  CHANGE_AUTH_REQ,
  CHANGE_AUTH_SUC,
  CHANGE_AUTH_FAIL,
  FETCH_ADMIN_REQ,
  FETCH_ADMIN_SUC,
  FETCH_ADMIN_FAIL,
} from './userType';

import Axios from 'axios';
import { API } from '../../API_GLOBAL';
import { showSnackbar } from '../globalSnackBar/snackAction';

export const changeAuthReq = () => {
  return {
    type: CHANGE_AUTH_REQ,
  };
};

export const changeAuthSuc = (message) => {
  return {
    type: CHANGE_AUTH_SUC,
    message,
  };
};

export const changeAuthFail = (message) => {
  return {
    type: CHANGE_AUTH_FAIL,
    message,
  };
};
export const fetchAdminReq = () => {
  return {
    type: FETCH_ADMIN_REQ,
  };
};

export const fetchAdminSuc = (data) => {
  return {
    type: FETCH_ADMIN_SUC,
    payload: data,
  };
};

export const fetchAdminFail = (message) => {
  return {
    type: FETCH_ADMIN_FAIL,
    payload: message,
  };
};

export const setAuth = (data) => {
  console.log('yoo')
  return (dispatch) => {
    dispatch(changeAuthReq());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.patch(`${API}/admin/changeauth`, data)
      .then((res) => {
        dispatch(changeAuthSuc(res.data.message));
        dispatch(showSnackbar(res.data.message, res.status));
        dispatch(fetchAdmin());
      })
      .catch((err) => {
        dispatch(changeAuthFail());
        if (err && err.response && err.response.data.message) {
          dispatch(changeAuthFail(err.response.data.message));
          dispatch(showSnackbar(err.response.data.message, err.status));
        }
        if (err && !err.response) {
          dispatch(changeAuthFail(err.message));
          dispatch(showSnackbar(err.message, err.status));
        }
      });
  };
};

export const fetchAdmin = () => {
  return (dispatch) => {
    dispatch(fetchAdminReq());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.get(`${API}/admin/fetchadmin`)
      .then((res) => {
        dispatch(fetchAdminSuc(res.data.adminData));
      })
      .catch((err) => {
        if (err && err.response && err.response.data.message) {
          dispatch(fetchAdminFail(err.response.data.message));
        }
        if (err && !err.response) {
          dispatch(fetchAdminFail(err.message));
        }
      });
  };
};
