import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  VERIFICATION_REQUEST,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILED,
  LOGOUT,
  DESTROY_MESSAGE,
} from "./authType";
import { showSnackbar } from "../index";
import { API } from "../../API_GLOBAL";
import Axios from "axios";

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
};
export const verifyToken = () => {
  return {
    type: VERIFICATION_REQUEST,
  };
};

export const verificationSucess = (data) => {
  return {
    type: VERIFICATION_SUCCESS,
    payload: data,
  };
};

export const verificationFailed = (error) => {
  return {
    type: VERIFICATION_FAILED,
    payload: error,
  };
};

export const removeMessage = () => {
  return {
    type: DESTROY_MESSAGE,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const destroyMessage = () => {
  return (dispatch) => {
    dispatch(removeMessage());
  };
};

export const setLogout = () => {
  return (dispatch) => {
    dispatch(logout());
    localStorage.removeItem("token");
    dispatch(destroyMessage());
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(loginRequest());
    Axios.post(`${API}/admin/login`, data)
      .then((res) => {
        let token = res.data.token;
        localStorage.setItem("token", `Bearer ${token}`);
        let finalToken = `Bearer ${token}`;
        dispatch(loginSuccess(res.data.message));
        dispatch(showSnackbar(res.data.message, res.status));
        dispatch(fetchUser(finalToken));
      })
      .catch((err) => {
        if (err && err.response && err.response.data.message) {
          dispatch(loginFailed(err.response.data.message));
          dispatch(
            showSnackbar(err.response.data.message, err.response.status)
          );
        }
        if (err && !err.response) {
          dispatch(loginFailed(err.message));
        }
      });
  };
};
export const fetchUser = (token) => {
  return (dispatch) => {
    dispatch(verifyToken());
    Axios.defaults.headers.common["Authorization"] = token;
    Axios.get(`${API}/admin/profile`)
      .then((res) => {
        const data = res.data.findUser;
        dispatch(verificationSucess(data));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(verificationFailed(error));
        dispatch(setLogout());
      });
  };
};
