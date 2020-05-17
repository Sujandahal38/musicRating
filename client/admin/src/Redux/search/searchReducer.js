import { SEARCH_REQ, SEARCH_SUC, SEARCH_FAIL, CLEAR_SEARCH,  } from './searchType';

const initialState = {
};

const searchReducer = (state = initialState, action) => {
 switch(action.type) {
  case SEARCH_REQ:
  return {
   searching: true,
  }
  case SEARCH_SUC: 
  return {
   searching: false,
   results: action.payload,
  }
  case SEARCH_FAIL:
   return {
    searching: false,
    message: action.message,
   }
   case CLEAR_SEARCH: {
    return {
      message: 'cleared'
    }
   }
   default: 
   return {
     ...state
   }
 }
} 
export default searchReducer;