import {COMMENT_REQ, COMMENT_SUCCESS, COMMENT_FAILED, FETCH_COMMENT_REQ, FETCH_COMMENT_SUC, FETCH_COMMENT_FAILED } from './commentTypes';
import Axios from 'axios';
import { HOST } from '../../host';
export const commentReq = () => {
    return {
        type: COMMENT_REQ,
    }
}

export const commentSuccess = (message, status) => {
    return {
        type: COMMENT_SUCCESS,
        message: message,
        status: status
    }
}

export const commentFailed = (message, status) => {
    return {
        type: COMMENT_FAILED,
        message: message,
        status: status
    }
}

export const fetchCommentReq = () => {
    return {
        type: FETCH_COMMENT_REQ,
    };
};

export const fetchCommentSuc = (comments, message) => {
    return {
        type: FETCH_COMMENT_SUC,
        message: message,
        comments: comments
    }
}

export const fetchCommentFailed = (message) => {
    return {
        type: FETCH_COMMENT_FAILED,
        message: message
    }
}

export const addComment = (id,comment) => {
    return (dispatch) => {
        dispatch(commentReq());
        Axios.post(`${HOST}/addComment`, {id, comment}).then((res) => {
            dispatch(commentSuccess(res.data.message, res.status));
            dispatch(fetchComment(id));
        }).catch((err) => {
            dispatch(fetchComment(id));
            if (err && err.response) {
                dispatch(commentFailed(err.response.data.message, err.response.status));
            }
        })
    }
}

export const fetchComment =(id) => {
    return (dispatch) => {
        dispatch(fetchCommentReq());
        Axios.get(`${HOST}/videobyid/${id}`)
          .then((res) => {
            dispatch(fetchCommentSuc(res.data.videoData.mvdbComments.reverse(),res.data.message));
          })
          .catch((err) => {
            if (err?.response?.data) {
              dispatch(
                fetchCommentFailed(err.response.data.message)
              );
            }
          });
      };
}