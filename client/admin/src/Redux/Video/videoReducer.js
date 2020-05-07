import { ADD_VIDOE_REQ, ADD_VIDEO_SUC, ADD_VIDEO_FAILED, FETCH_VIDEO_REQ, FETCH_VIDEO_SUC, FETCH_VIDEO_FAILED } from './videoType';


const initialState = {
 loading: false,
 message: '',
 status: 0,
}

const videoReducer = (state = initialState, action) => {
 switch(action.type) {
  case ADD_VIDOE_REQ: 
  return {
   ...state,
   loading: true,
  }
  case ADD_VIDEO_SUC: 
  return {
   loading: false,
   message: action.message,
  }
  case ADD_VIDEO_FAILED: 
  return {
   ...state,
   loading: false,
   message: action.error,
  }
  case FETCH_VIDEO_REQ: 
  return {
   fetching: true,
  }
  case FETCH_VIDEO_SUC:
   return {
    ...state,
    fetching: false,
    videoData: action.payload,
    message: action.message,
   }
   case FETCH_VIDEO_FAILED : 
   return {
    ...state,
    fetching: false,
    message: action.message,
   }
  default: 
  return {
   ...state,
  }
 }
}

export default videoReducer;