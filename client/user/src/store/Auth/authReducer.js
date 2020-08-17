import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VERIFICATION_REQUEST,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILED,
  LOGOUT,
} from './authTypes';

const initialState = {
  loading: false,
  isLoggedIn: false,
  message: '',
  tokenExpired: false,
  status: 0,
  userData: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        message: action.message,
        status: action.status,
        userData: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        message: action.message,
        status: action.status,
      };
    case VERIFICATION_REQUEST:
      return {
        verifying: true,
      };
    case VERIFICATION_SUCCESS:
      return {
        verifying: false,
        isLoggedIn: true,
        message: action.message,
        status: action.status,
      };
    case VERIFICATION_FAILED:
      return {
        verifying: false,
        message: action.message,
        status: action.status,
      };
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
