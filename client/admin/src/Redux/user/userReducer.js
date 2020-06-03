import {
  CHANGE_AUTH_REQ,
  CHANGE_AUTH_SUC,
  CHANGE_AUTH_FAIL,
  FETCH_ADMIN_REQ,
  FETCH_ADMIN_SUC,
  FETCH_ADMIN_FAIL,
} from './userType';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AUTH_REQ:
      return {
        loading: true,
      };
    case CHANGE_AUTH_SUC:
      return {
        loading: false,
        message: action.message,
      };
    case CHANGE_AUTH_FAIL:
      return {
        loading: false,
        message: action.message,
      };
    case FETCH_ADMIN_REQ:
      return {
        fetching: true,
      };
    case FETCH_ADMIN_SUC: 
    return {
      fetching: false,
      adminData: action.payload,
    }
    case FETCH_ADMIN_FAIL: 
    return {
      fetching: false,
      message: action.payload
    }
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
