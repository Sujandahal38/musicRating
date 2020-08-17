import { SNACKBAR , SNACKBAR_CLEAR } from "./snackType";



export const showSuccessSnackbar = (message, status) => {
  return {
   type: SNACKBAR,
   message: message,
   status: status,
  }
};

export const clearSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: SNACKBAR_CLEAR });
  };
};

export const showSnackbar = (message,status) => {
 return (dispatch) => {
  dispatch(showSuccessSnackbar(message,status))
 }
}