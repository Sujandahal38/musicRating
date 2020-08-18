import {
  COMMENT_REQ,
  COMMENT_SUCCESS,
  COMMENT_FAILED,
  FETCH_COMMENT_REQ,
  FETCH_COMMENT_SUC,
  FETCH_COMMENT_FAILED,
} from './commentTypes';

const intialState = {};

const commentReducer = (state = intialState, action) => {
  switch (action.type) {
    case COMMENT_REQ:
      return {
        loading: true,
      };
    case COMMENT_SUCCESS:
      return {
        loading: false,
        message: action.message,
        status: action.status,
      };
    case COMMENT_FAILED:
      return {
        loading: false,
        message: action.message,
        status: action.status,
      };
    case FETCH_COMMENT_REQ:
      return {
        fetching: true,
      };
    case FETCH_COMMENT_SUC:
      return {
          ...state,
        fetching: false,
        comments: action.comments,
        message: action.message,
      };
    case FETCH_COMMENT_FAILED:
      return {
        fetching: false,
        message: action.message,
      };
    default:
      return {
        ...state,
      };
  }
};

export default commentReducer;
