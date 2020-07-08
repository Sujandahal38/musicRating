import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CHECK_USERNAME,
  VALID_USERNAME,
  INVALID_USERNAME,
  DESTROY_MESSAGE,
} from './signupTypes';

import { API } from '../../API_GLOBAL';
import { showSnackbar } from '../index';

import Axios from 'axios';

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const deleteMessage = () => {
  return {
    type: DESTROY_MESSAGE,
  };
};

export const signupSucccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};

export const signupFailed = (error, email) => {
  return {
    type: SIGNUP_FAILED,
    payload: error,
    email: email,
  };
};
export const checkUsername = () => {
  return {
    type: CHECK_USERNAME,
  };
};
export const validUsername = (message, username) => {
  return {
    type: VALID_USERNAME,
    payload: message,
    username: username,
  };
};
export const invalidUsername = (error) => {
  return {
    type: INVALID_USERNAME,
    payload: error,
  };
};

export const setRequest = (data) => {
  return (dispatch) => {
    dispatch(signupRequest());
    Axios.post(`${API}/admin/signup`, data)
      .then((res) => {
        dispatch(showSnackbar(res.data.message, res.status));
        dispatch(signupSucccess(res.data.message));
      })
      .catch((err) => {
        if (err && err.response && err.response.data.message) {
          dispatch(
            signupFailed(err.response.data.message, err.response.data.email)
          );
          dispatch(
            showSnackbar(err.response.data.message, err.response.status)
          );
        }
        if (err && !err.response) {
          dispatch(signupFailed(err.message));
        }
      });
  };
};

export const checkValidUsername = (data) => {
  return (dispatch) => {
    dispatch(checkUsername());
    Axios.post(`${API}/admin/checkusername`, data)
      .then((res) => {
        dispatch(validUsername(res.data.message, data, res.data.data));
        dispatch(showSnackbar(res.data.message, res.status));
      })
      .catch((err) => {
        if (err && err.response && err.response.data.message) {
          dispatch(invalidUsername(err.response.data.message));
          dispatch(
            showSnackbar(err.response.data.message, err.response.status)
          );
        }
        if (err && !err.response) {
          dispatch(invalidUsername(err.message));
        }
      });
  };
};
export const messageDelete = () => {
  return (dispatch) => {
    dispatch(deleteMessage());
  };
};
