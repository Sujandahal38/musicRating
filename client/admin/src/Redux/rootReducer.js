import { combineReducers  } from 'redux';

import authReducer from './Auth/authReducers'
import signupReducer from './Signup/signupReducer';
import snackReducer from './globalSnackBar/snackReducer';
import addVideoReducer from './addVideo/addVideoReducer';

const rootReducer = combineReducers({
 auth: authReducer,
 signup: signupReducer,
 snack: snackReducer,
 addVideo: addVideoReducer,
});


export default rootReducer;