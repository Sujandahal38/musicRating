import { combineReducers  } from 'redux';

import authReducer from './Auth/authReducers'
import signupReducer from './Signup/signupReducer';
import snackReducer from './globalSnackBar/snackReducer';
import videoReducer from './Video/videoReducer';

const rootReducer = combineReducers({
 auth: authReducer,
 signup: signupReducer,
 snack: snackReducer,
 video: videoReducer,
});


export default rootReducer;