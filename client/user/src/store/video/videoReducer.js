import {
  FETCH_VIDEO_REQ,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_FAILED,
  FETCH_ID_REQ,
  FETCH_ID_SUCCESS,
  FETCH_ID_FAILED,
  FETCH_NEW_REQ,
  FETCH_NEW_SUC,
  FETCH_NEW_FAILED,
  FETCH_GENRE_REQ,
  FETCH_GENRE_SUC,
  FETCH_GENRE_FAIL,
} from './videoTypes';

const initialState = {};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEO_REQ:
      return {
        loading: true,
      };
    case FETCH_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videoData: action.videos,
      };
    case FETCH_VIDEO_FAILED:
      return {
        loading: false,
        message: action.message,
      };
    case FETCH_ID_REQ:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        message: action.message,
        videoById: action.video,
      };
    case FETCH_ID_FAILED:
      return {
        ...state,
        fetching: false,
        message: action.message,
        status: action.status,
      };
    case FETCH_NEW_REQ:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_NEW_SUC:
      return {
        ...state,
        fetching: true,
        message: action.message,
        latestVideo: action.videos,
      };
    case FETCH_NEW_FAILED:
      return {
        ...state,
        fetching: true,
        message: action.message,
      };
    case FETCH_GENRE_REQ:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GENRE_SUC:
      return {
        ...state,
        loading: false,
        genreVideo: action.payload,
      };
    case FETCH_GENRE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default videoReducer;
