import {
  ADD_VIDOE_REQ,
  ADD_VIDEO_SUC,
  ADD_VIDEO_FAILED,
  FETCH_VIDEO_REQ,
  FETCH_VIDEO_SUC,
  FETCH_VIDEO_FAILED,
  VIDEO_ID_REQ,
  VIDEO_ID_SUC,
  VIDEO_ID_FAIL,
  FETCH_COMMENT_SUC,
  FETCH_COMMENT_FAIL,
  FETCH_COMMENT_REQ,
  DELETE_VIDEO_REQ,
  DELETE_VIDEO_SUC,
  DELETE_VIDEO_FAIL,
  EDIT_VIDEO_REQ,
  EDIT_VIDEO_SUC,
  EDIT_VIDEO_FAIL,
  ANALYZE_REQ,
  ANALYZE_SUC,
  ANALYZE_FAIL
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

export const VideoIdReq = () => {
  return {
    type: VIDEO_ID_REQ,
  }
}

export const videoIdSuc = (data) => {
  return {
    type: VIDEO_ID_SUC,
    payload: data,
  }
}

export const videoIdFail = (error) => {
  return {
    type: VIDEO_ID_FAIL,
    payload: error,
  }
}
export const commentFetch = () => {
  return {
    type: FETCH_COMMENT_REQ,
  }
}
export const commentFetchSuc = (message) => {
  return {
    type: FETCH_COMMENT_SUC,
    message: message,
  }
}
export const commentFetchFail = (message) => {
  return {
    type: FETCH_COMMENT_FAIL,
    message: message,
  }
}

export const deleteVideoReq = () => {
  return {
    type: DELETE_VIDEO_REQ,
  }
}

export const deleteVideoSuc = (message) => {
  return {
    type: DELETE_VIDEO_SUC,
    payload: message,
  }
}

export const deleteVideoFail = (message) => {
  return {
    type: DELETE_VIDEO_FAIL,
    payload: message,
  }
}

export const editVideoReq = () => {
  return {
    type: EDIT_VIDEO_REQ,
  }
}

export const editVideoSuc = (message) => {
  return {
    type: EDIT_VIDEO_SUC,
    payload: message,
  }
}
export const editVideoFail = (message) => {
  return {
    type: EDIT_VIDEO_FAIL,
    payload: message,
  }
}
export const analyzeReq = () => {
  return {
    type: ANALYZE_REQ,
  }
}
export const analyzeSuc = (message, rating, status) => {
  return {
    type: ANALYZE_SUC,
    message: message,
    rating: rating,
    status: status
  }
}
export const analyzeFailed = (message, status) => {
  return {
    type: ANALYZE_FAIL,
    message: message,
    status: status
  }
}

export const deleteVideo = (id, params) => {
  return (dispatch) => {
    dispatch(deleteVideoReq());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.delete(`${API}/admin/deletevideo/${id}`)
    .then(res => {
      dispatch(deleteVideoSuc(res.data.message));
      if ( params === '/dashboard/managevideo') {
        dispatch(setFetchVideo(0));
        }
      dispatch(showSnackbar(res.data.message, res.status));

    }).catch(err => {
      if (err && err.response && err.response.data.message) {
        dispatch(deleteVideoFail(err.response.data.message));
        dispatch(showSnackbar(err.response.data.message, err.status));
      }
      if (err && !err.response ) {
        dispatch(deleteVideoFail(err.message));
        dispatch(showSnackbar(err.message, err.status));
      }
    })
  }
}

export const setCommentFetch = (id) => {
  return (dispatch) => {
    dispatch(commentFetch());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.get(`${API}/admin/fetchcomment/${id}`)
    .then(res => {
      dispatch(commentFetchSuc(res.data.message));
      dispatch(showSnackbar(res.data.message, res.status));
      dispatch(getVideoByID(id));
    })
    .catch(err => {
      if (err && err.response && err.response.data.message) {
        dispatch(videoIdFail(err.response.data.message));
        dispatch(showSnackbar(err.response.data.message, err.status));
      }
      if (err && !err.response ) {
        dispatch(videoIdFail(err.message));
        dispatch(showSnackbar(err.message, err.status));
      }
    })
  }
}

export const getVideoByID = (id) => {
  return (dispatch)=> {
    dispatch(VideoIdReq());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.get(`${API}/admin/videobyid/${id}`)
    .then(res => {
      dispatch(videoIdSuc(res.data.videoData));
    }).catch(err => {
        if (err && err.response && err.response.data.message) {
          dispatch(videoIdFail(err.response.data.message));
        }
        if (err && !err.response ) {
          dispatch(videoIdFail(err.message));
        }
    })
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

export const editVideo = (id, data) => {
  return (dispatch) => {
    dispatch(editVideoReq());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common["Authorization"] = token;
    Axios.patch(`${API}/admin/editvideo/${id}`,data)
    .then(res => {
      dispatch(editVideoSuc(res.data.message));
      dispatch(showSnackbar(res.data.message, res.status));
    }).catch(err => {
      if (err && err.response && err.response.data.message) {
        dispatch(
          editVideoFail(err.response.data.message)
        );
        dispatch(showSnackbar(err.response.data.message, err.status));
      }
      if (err && !err.response) {
        dispatch(fetchVideoFailed(err.message));
        dispatch(showSnackbar(err.message, err.status));
      }
    })
}
  }

  export const analyzeVideo = (id) => {
    return (dispatch)=> {
      dispatch(analyzeReq())
      const token = localStorage.getItem('token');
      Axios.defaults.headers.common["Authorization"] = token;
      Axios.get(`${API}/admin/analyze/${id}`).then((res) => {
        dispatch(analyzeSuc(res.data.message, res.data.ratings, res.status))
        dispatch(showSnackbar(res.data.message, res.status))
      }).catch((err) => {
        if (err && err.response && err.response.data.message) {
          dispatch(
            analyzeFailed(err.response.data.message)
          );
          dispatch(showSnackbar(err.response.data.message, err.status));
        }
        if (err && !err.response) {
          dispatch(analyzeFailed(err.message));
          dispatch(showSnackbar(err.message, err.status));
        }
      })
    }
  }
