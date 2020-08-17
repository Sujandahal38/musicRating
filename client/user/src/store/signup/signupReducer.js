import {
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CHECK_USERNAME_REQ,
  CHECK_USERNAME_FAILED,
  CHECK_USERNAME_SUCCESS,
} from './signupTypes';

const initialState = {
  loading: false,
  status: 0,
  message: '',
  isValidUsername: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQ:
      return {
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        message: action.message,
        status: action.status,
      };
    case SIGNUP_FAILED:
      return {
        loading: false,
        message: action.message,
        status: action.status,
      };
    case CHECK_USERNAME_REQ:
      return {
        loading: true,
      };
    case CHECK_USERNAME_FAILED:
      return {
        loaing: false,
        message: action.message,
        status: action.status,
        isValidUsername: false
      };
    case CHECK_USERNAME_SUCCESS:
      return {
        loading: false,
        message: action.message,
        status: action.status,
        isValidUsername: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default signupReducer;