
import { SNACKBAR, SNACKBAR_CLEAR } from './snackType';
const snackReducer = (state = {}, action) => {
 switch (action.type) {
   case SNACKBAR:
     return {
       ...state,
       snackbarOpen: true,
       snackbarMessage: action.message,
       status: action.status
     };
   case SNACKBAR_CLEAR:
     return {
       ...state,
       snackbarOpen: false,
     };
   default:
     return state;
 }
};

export default snackReducer;