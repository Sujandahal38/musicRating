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
  FETCH_GENRE_FAIL
} from './videoTypes';
import Axios from 'axios';
import { HOST } from '../../host';

export const fetchVideoReq = () => {
  return {
    type: FETCH_VIDEO_REQ,
  };
};

export const fetchVideoSuccess = (videos) => {
  return {
    type: FETCH_VIDEO_SUCCESS,
    videos: videos,
  };
};

export const fetchVideoFailed = (message, status) => {
  return {
    type: FETCH_VIDEO_FAILED,
    message: message,
    status: status,
  };
};

export const fetchByIdReq = () => {
  return {
    type: FETCH_ID_REQ,
  };
};
export const fetchByIdSuc = (message, video) => {
  return {
    type: FETCH_ID_SUCCESS,
    message: message,
    video: video,
  };
};

export const fetchByIdFailed = (message, status) => {
  return {
    type: FETCH_ID_FAILED,
    message: message,
    status: status,
  };
};
export const fetchNewReq = () => {
  return {
    type: FETCH_NEW_REQ,
  };
};

export const fetchNewSuc = (videos, message) => {
  return {
    type: FETCH_NEW_SUC,
    message: message,
    videos: videos
  };
};

export const fetchNewFailed = (message) => {
    return {
        type: FETCH_NEW_FAILED,
        message: message,
    }
  }

  const fetchGenreReq = () => {
    return {
      type: FETCH_GENRE_REQ,
    }
  }

  const fetchGenreSuc = (videos) => {
    return {
      type: FETCH_GENRE_SUC,
      payload: videos,
    }
  }
  const fetchGenreFail = (message) => {
    return {
      type: FETCH_GENRE_FAIL,
      payload: message,
    }
  }


export const fetchLatestVideo = (limit) => {
    return (dispatch)=> {
        dispatch(fetchNewReq());
        Axios.get(`${HOST}/fetchvideo/${limit}`).then((res) =>{
                dispatch(fetchNewSuc(res.data.videoData, res.data.message));
        }).catch((err) => {
            if (err?.response?.data) {
                dispatch(fetchNewFailed(err.response.data.message));
            }
        })
    }
}
export const fetchVideo = () => {
  return (dispatch) => {
    dispatch(fetchVideoReq());
    Axios.get(`${HOST}/videos/6`)
      .then((res) => {
        dispatch(fetchVideoSuccess(res.data.videos));
      })
      .catch((err) => {
        if (err?.response?.data) {
          dispatch(
            fetchVideoFailed(err.response.data.message, err.response.status),
          );
        }
      });
  };
};

export const fetchVideoById = (id) => {
  return (dispatch) => {
    dispatch(fetchByIdReq());
    Axios.get(`${HOST}/videobyid/${id}`)
      .then((res) => {
        dispatch(fetchByIdSuc(res.data.message, res.data.videoData));
      })
      .catch((err) => {
        if (err?.response?.data) {
          dispatch(
            fetchByIdFailed(err.response.data.message, err.response.status),
          );
        }
      });
  };
};

export const videoByGenre = (genre) => {
    return (dispatch) => {
        dispatch(fetchByIdReq());
        Axios.get(`${HOST}/videoByGenre/${genre}`)
          .then((res) => {
              dispatch(fetchGenreSuc(res.data?.videos))
          }).catch((err) => {
            dispatch(fetchGenreFail(err?.response?.data?.message));
          })
    }
}