import { ADD_VIDOE_REQ, ADD_VIDEO_SUC, ADD_VIDEO_FAILED } from './addvideoType';
import Axios from 'axios';
import { API } from '../../API_GLOBAL';
import { showSnackbar } from '../index'

export const addVideo = () => {
 return {
  type: ADD_VIDOE_REQ,
 }
} 

export const addVideoSucess = (message) => {
 return {
  type: ADD_VIDEO_SUC,
  payload: message,
 }
} 

export const addVideoFailed = (error) => {
 return {
  type: ADD_VIDEO_FAILED,
  payload: error,
 }
}

export const setAddVideoRequest= (data) => {
 return (dispatch) => {
  dispatch(addVideo());
  const token = localStorage.getItem('token');

  Axios.post(`${API}/admin/addvideo`, data)
  .then(res => {
   dispatch(addVideoSucess(res.data.message));
   dispatch(showSnackbar(res.data.message, res.status));
  }).catch(err=> {
   if (err && err.response && err.response.data.message) {
    dispatch(
      addVideoFailed(err.response.data.message)
    );
    dispatch(
     showSnackbar(err.response.data.message, err.response.status)
    );
  }
  if (err && !err.response) {
    dispatch(addVideoFailed(err.message));
    dispatch(showSnackbar(err.message));
  }
  })
 }
}