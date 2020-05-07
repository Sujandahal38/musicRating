import {
  ADD_VIDOE_REQ,
  ADD_VIDEO_SUC,
  ADD_VIDEO_FAILED,
  FETCH_VIDEO_REQ,
  FETCH_VIDEO_SUC,
  FETCH_VIDEO_FAILED
} from './videoType';
import Axios from 'axios';
import {
  API
} from '../../API_GLOBAL';
import {
  showSnackbar
} from '../index'

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

export const fetchVideoRequest = () => {
  return {
    type: FETCH_VIDEO_REQ,
  }
}

export const fetchVideoSucess = (data, message) => {
  return {
    type: FETCH_VIDEO_SUC,
    payload: data,
    message: message,
  }
}
export const fetchVideoFailed = (error) => {
  return {
    type :FETCH_VIDEO_FAILED,
    payload: error,
  }
}

export const setAddVideoRequest = (data) => {
  return (dispatch) => {
    dispatch(addVideo());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common["Authorization"] = token;
    Axios.post(`${API}/admin/addvideo`, data)
      .then(res => {
        dispatch(addVideoSucess(res.data.message));
        dispatch(showSnackbar(res.data.message, res.status));
        dispatch(setFetchVideo(10));
      }).catch(err => {
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

export const setFetchVideo = (limit) => {
  return (dispatch) => {
    dispatch(fetchVideoRequest());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common["Authorization"] = token;
    console.log('dispathcing...')
    Axios.get(`${API}/admin/fetchvideo/${limit}`)
    .then(res => {
      dispatch(fetchVideoSucess(res.data.videoData, res.data.message));
    })
    .catch(err => {
      if (err && err.response && err.response.data.message) {
        dispatch(
          fetchVideoFailed(err.response.data.message)
        );
      }
      if (err && !err.response) {
        dispatch(fetchVideoFailed(err.message));
      }
    })
  }
}