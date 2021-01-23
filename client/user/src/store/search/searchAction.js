import { SEARCH_REQ, SEARCH_SUC, SEARCH_FAIL, CLEAR_SEARCH,  } from './searchType';

import { HOST as API } from '../../host';
import Axios from 'axios';

export const searchReq = () => {
  return {
    type: SEARCH_REQ,
  };
};

export const searchSuc = (data) => {
  return {
    type: SEARCH_SUC,
    payload: data,
  };
};

export const searchFail = (message) => {
  return {
    type: SEARCH_FAIL,
    message: message,
  };
};

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
  }
}


export const setSearch = (text) => {
  return (dispatch) => {
    dispatch(searchReq());
    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = token;
    Axios.get(`${API}/admin/search/${text}`)
      .then((res) => {
        dispatch(searchSuc(res.data));
      })
      .catch((err) => {
        if (err && err.response && err.response.data.message) {
          dispatch(searchFail(err.response.data.message));
        }
      });
  };
};
