import { ADD_VIDOE_REQ, ADD_VIDEO_SUC, ADD_VIDEO_FAILED } from './addvideoType';


const initialState = {
 loading: false,
 message: '',
 status: 0,
}

const addVideoReducer = (state = initialState, action) => {
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
   loading: false,
   message: action.error,
  }
  default: 
  return {
   ...state,
  }
 }
}

export default addVideoReducer;